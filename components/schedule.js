export default function Selection() {
	/* please count from 0, the conditional statement determines if the day is currently wednesday, true means it is. */
	return new Date().getDay() === 3 ? "1" // this is the  flex schedule
	: "0"; // edit this for the schedule you want displayed corresponding with the number in the json file

}
