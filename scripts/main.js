console.log("hello beautiful")
import { loadLegos, useLegos } from './legos/LegoData.js'
import { makeLegoList } from './legos/LegoList.js';

const navElement = document.querySelector("nav");

// event listener for filter of Red legos
navElement.addEventListener("click", (event) => {
	if (event.target.id === "showRed") {
		filterLegos("Red")
	} else if (event.target.id === "showAll") {
		makeLegoList(useLegos())
	}
})

// event listener for filter of Green legos
navElement.addEventListener("click", (event) => {
	if (event.target.id === "showGreen") {
		filterLegos("Green")
	} else if (event.target.id === "showAll") {
		makeLegoList(useLegos())
	}
})

// event listener for filter by materials
navElement.addEventListener("change", (event) => {
	if (event.target.id === "materialSelector") {
		materialFilter(event.target.value)
	} else if (event.target.id === "showAll") {
		makeLegoList(useLegos())
	}
})

// event listener for filter with search bar
navElement.addEventListener("keypress", (event) => {
	if (event.key === 'Enter' && event.target.id === 'legoSearch') {
		const legoValue = document.querySelector("input[name='legoSearch']").value
		idFilter(legoValue);
	} else if (event.target.id === "showAll") {
		makeLegoList(useLegos())
	}
})

// function to filter for certain color legos
const filterLegos = (whatFilter) => {
	const filterArray = useLegos().filter(singleLego => {
		if (singleLego.LegoName.includes(whatFilter)) {
			return singleLego;
		}
	})
	makeLegoList(filterArray);
}

// function to filter for certain materials
const materialFilter = (whatFilter) => {
	const filterArray = useLegos().filter(singleLego => {
		if (singleLego.Material.includes(whatFilter)) {
			return singleLego;
		}
	})
	makeLegoList(filterArray);
}

// function for search bar
const idFilter = (searchValue) => {
	const filterArray = useLegos().filter(singleLego => {
		if (singleLego.LegoId === searchValue) {
			return singleLego;
		}
	})
	if (filterArray.length > 0) {
		makeLegoList(filterArray)
	} else {
		document.getElementById("all-legos").innerHTML = "<p>Not a valid Lego Id</p>"
	}
}
// function to boot up the lego site
const startEIA = () => {
	loadLegos()
	.then(legoArray => {
		makeLegoList(legoArray)
	})

}

// invoking boot up function
startEIA();