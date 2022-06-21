import Head from "next/head";
import {useState, useEffect} from "react";
import useSWR from "swr";
import {Howl, Howler} from 'howler';

import Selection from "../components/schedule.js";
import res from "../components/schedule.json";

export async function getStaticProps() {
    const fetcher = (url) =>
        fetch(url, {
            headers: {
                Accept: "application/json",
            },
        }).then((r) => r.json());

    let response;

    try {
        response = await fetcher(`https://icanhazdadjoke.com/`);
    } catch (e) {
        response = await fetcher('http://0.0.0.0:3000/api/backup')
        console.log(response)
    }

    console.log(response)
    console.log("=== Server Side ===")

    return {
        props: {
            response,
        },
    };
}

export default function Home(props) {
    console.log("==== HOME ====")
    const fetcher = (url) => {
        fetch(url, {
            headers: {
                Accept: "application/json",
            },
        }).then((r) => r.json());
    }

    console.log(props.response)
    console.log("Res ^^")

    if (!props.response.error) {
        const {data} = useSWR(props.response.error ? "http://0.0.0.0:3000" : "https://icanhazdadjoke.com/", fetcher, {
            initialData: props.response,
            refreshInterval: 1000,
        });
        console.log(data)
    }

    useEffect(() => {
        const baseline = 128;

        const c = document.getElementById("canv");
        const $ = c.getContext("2d");

        const col = (x, y, r, g, b) => {
            $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            $.fillRect(x, y, 1, 1);
        };
        const R = function (x, y, t) {
            return Math.floor(baseline + 64 * Math.cos((x * x - y * y) / 300 + t));
        };

        const G = (x, y, t) => {
            return Math.floor(
                baseline +
                64 *
                Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
            );
        };

        var B = function (x, y, t) {
            return Math.floor(
                baseline +
                64 *
                Math.sin(
                    5 * Math.sin(t / 9) +
                    ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
                )
            );
        };

        var t = 0;

        var run = function () {
            for (let x = 0; x <= 35; x++) {
                for (let y = 0; y <= 35; y++) {
                    col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
                }
            }
            t = t + 0.05;
            window.requestAnimationFrame(run);
        };
        run();
    }, []);

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [count, setCount] = useState(0);

    const [joke, setJoke] = useState(props.response.error ? props.response.joke : data.joke);

    const [colour, setColour] = useState("");
    const [sfxOn, setSfx] = useState(false)

    const [block, setBlock] = useState("loading...");
    const [next, setNext] = useState("loading...")
    const [countdown, setCountdown] = useState("loading...");

    const [time, setTime] = useState(new Date().toLocaleTimeString(["fr-FR"]));
    const [properTime, setProperTime] = useState(
        new Date().toLocaleTimeString(["en-US"], {hour: '2-digit', minute: '2-digit'})
    );
    const [date, setDate] = useState("loading...");

    // const gong = new Audio('/gong.wav');

    function formatCountdown() {
        let difference =
            new Date(
                `${
                    months[new Date().getMonth()]
                } ${new Date().getDate()}, ${new Date().getFullYear()} ${countdown}`
            ).getTime() - new Date().getTime();

        if (difference < 0) {
            difference =
                new Date(
                    `${months[new Date().getMonth()]} ${
                        new Date().getDate() + 1
                    }, ${new Date().getFullYear()} ${countdown}`
                ).getTime() - new Date().getTime();
        }

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    const response = res.schedule[Selection()].values;

    useEffect(() => {
        for (const property in response) {
            if (
                res.schedule[Selection()].values[property].start <
                new Date().toLocaleTimeString(["fr-FR"])
            ) {
                setSfx(res.schedule[Selection()].values[property].sfx)
                setColour(res.schedule[Selection()].values[property].colour);
                setBlock(res.schedule[Selection()].values[property].text);
                setNext(res.schedule[Selection()].values[parseInt(property) + 1]?.text ?? null)
                setCountdown(res.schedule[Selection()].values[property].end);
            }
        }
    });

    // useEffect(() => {
    // 	if (block !== "loading..." && sfxOn) {
    // 		console.log("sfx on")
    // 		gong.load()
    // 		gong.play()
    // 	}
    // }, [block])

    useEffect(() => {
        setDate(
            `${days[new Date().getDay()]}, ${
                months[new Date().getMonth()]
            } ${new Date().getDate()}, ${new Date().getFullYear()}`
        );
    }, []);

    useEffect(() => {
        if (!props.response.error) {
            const interval = setInterval(() => {
                setCount(count + 1);
                setJoke(data.joke);
            }, 300000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [count]);

    setInterval(() => {
        setTime(new Date().toLocaleTimeString(["fr-FR"]));
        setProperTime(new Date().toLocaleTimeString(["en-US"], {hour: '2-digit', minute: '2-digit'}));
        setDate(
            `${days[new Date().getDay()]}, ${
                months[new Date().getMonth()]
            } ${new Date().getDate()}, ${new Date().getFullYear()}`
        );
    }, 1000);

    function getJoke() {
        switch (joke.length >= 109) {
            case true:
                return <span className="text-shadow text-3xl">{joke}</span>;
            case false:
                return <span className="text-shadow text-4xl">{joke}</span>;
        }
    }

    return (
        <>
            <Head>
                <title>Clock</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <canvas
                id="canv"
                className="w-full h-full absolute"
                width="32"
                height="32"
            />
            <div className="select-none absolute top-0 left-0 text-white font-medium text-xl m-7">
                <span className="text-shadow">{time}</span>
            </div>

            <div className="select-none absolute bottom-0 right-0 text-white font-medium text-xl m-7">
                <span
                    className="text-shadow">{next?.toLowerCase()?.includes('lunch') ? "Lunch" : `Next ${next?.toLowerCase()?.includes('break') ? "break" : "block"}`} at: {countdown}</span>
            </div>

            <div className="flex flex-col items-center justify-center absolute w-full h-full">
                <div className="select-none text-white mb-2 mt-2 mx-16">
                    {getJoke()}
                </div>
                <div
                    className="py-8 rounded-2xl shadow-2xl text-center w-8/12"
                    style={{
                        backgroundColor: `rgba(${
                            colour == "default" ||
                            colour == null ||
                            colour == " " ||
                            colour == ""
                                ? "13, 9, 10"
                                : colour
                        }, .55)`,
                    }}
                >
                    <div className="text-white font-medium text-6xl select-none">
                        {block}
                    </div>
                    <div className="relative select-none text-9xl tracking-wider my-2 text-white font-bold">
                        {properTime}
                    </div>
                    <div className="text-6xl text-white select-none">{date}</div>
                    <div className="mt-12 font-normal text-white text-5xl select-none">
                        Time
                        Until {next?.toLowerCase()?.includes('lunch') ? "Lunch" : `Next ${next?.toLowerCase()?.includes('break') ? "Break" : "Block"}`}:
                    </div>
                    <div className="text-white font-normal text-6xl select-none">
                        {formatCountdown()}
                    </div>
                </div>
            </div>

            <div className="text-white absolute top-0 right-0 m-6">
                <a href="https://github.com/timberline-secondary/clock" target="_blank">
                    <svg
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="opacity-50 hover:opacity-75 cursor-pointer"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                        ></path>
                    </svg>
                </a>
            </div>
        </>
    );
}
