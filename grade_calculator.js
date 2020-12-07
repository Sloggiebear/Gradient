function classToggle(elementid) {
	var x = elementid;
	x.classList.toggle('visible');
    x.classList.toggle('hidden');
}

var allGrades = ["78.33|A+", "75.00|A", "71.67|A-", "68.33|B+","65.00|B", "61.67|B-", "58.33|C+", "55.00|C","51.67|C-", "48.33|D+", "45.00|D", "41.67|D-","38.33|E+", "35.00|E","31.67|E-", "28.33|F+","25.00|F", "21.67|F-","18.33|G+", "15.00|G","11.67|G-", "0.00|NG"];

function resetForm(){
	document.getElementById("themath").style.display = "none";
	document.getElementById("calc").style.display = "inline";
}

function getNumGrades(value){
	resetForm();
	listGrades(value);
	setActive();
}

function insult() {
	document.getElementById("dothething").className = "hidden";
	classToggle(document.getElementById("insult"));
	document.getElementById("grades").innerHTML = "";
}

function listGrades(numGrades) {
	///make sure the grades element is blank
	document.getElementById("grades").innerHTML = "";
	
	///make fun of anyone looking to average a single grade, ffs.	
	if (numGrades == "1") {
		classToggle(insult);
	} 
	
	///Generate the select options for the chosen number of grades to be averaged. 
	else {
		var el = document.getElementById("dothething");
		el.classList.remove("hidden");
		el.classList.add("button", "visible");
		document.getElementById("insult").className = "hidden";
		
		var sentinel = 0;
		while (sentinel < numGrades) {
			var newSelect = document.createElement("select");
			newSelect.setAttribute('id', "criteria" + (sentinel + 1));
			/// newSelect.setAttribute('size', '22');  
			newSelect.setAttribute('label', 'grade-list');
			newSelect.setAttribute('class', 'gradelist');
			document.getElementById("grades").appendChild(newSelect);  
				for (option in allGrades) {
					var pair = allGrades[option].split("|");
					var newOption = document.createElement("option");
					newOption.value = pair[0];
					newOption.label = pair[1];
					newOption.innerHTML = pair[1];
					newSelect.options.add(newOption);
				}
			sentinel++;

			/// Create a default selected option for each select element and set it to disabled and hidden
			var defaultopt = document.createElement('option');
			defaultopt.value = "";
			defaultopt.text = "Select a Grade";
			defaultopt.selected = true;
			defaultopt.hidden = true;
			defaultopt.disabled = true;
			newSelect.options.add(defaultopt);
			
		}
	return numGrades;
	}
} 

function clearGrades() {
	var select = document.getElementById("setnumgrades");
	var numGrades = document.querySelector('.active').innerHTML;
	for (i = 0; i < numGrades; i++) {
		var x = "criteria" + (i + 1);
		document.getElementById(x).selectedIndex = "-1";
	}
}


function sumGrades() {
	var select = document.getElementById("setnumgrades");
	var numGrades = document.querySelector('.active').innerHTML;
	var resultsArray = []
	try {
			for (step = 0; step < numGrades; step++) {
			var x = "criteria" + (step + 1);
			var select_id = document.getElementById(x);
			var selected_result = select_id.options[select_id.selectedIndex].value;
			resultsArray.push(parseFloat(selected_result));
		}
		totalGrades(resultsArray);
	}
	
	catch(err){
		alert("You didn't select enough grades.");
	}
}

function totalGrades(resultsArray) {
	var numGrades = document.querySelector('.active').innerHTML;
	var total = 0;
	for (step = 0; step < resultsArray.length; step++) {
		total = total + resultsArray[step];
	}
	var averageResult = parseFloat(total)/numGrades;
	roundedResult = averageResult.toFixed(2);
	var output = convertGrade(roundedResult);

	
	if (isNaN(roundedResult)) {
		document.getElementById("result").innerHTML = "You have to select criteria ye big eejit." ;
	}
	
	else {
		
		//Output result in HTML document
		document.getElementById("result").innerHTML = output;
		
		//Lists the values the user has entered
		document.getElementById("youselected").innerHTML = "" ;
		var ul = document.getElementById("youselected");
		for (x = 0; x < resultsArray.length; x++) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(convertGrade(resultsArray[x])));
			ul.appendChild(li);
		}
		
		//Lists the selected values in a grid with their numerical equivilent
		document.getElementById("enteredgrades").innerHTML = "" ;
		var entgrades = document.getElementById("enteredgrades");
		for (x = 0; x < resultsArray.length; x++) {
				var li = document.createElement("div");
				li.appendChild(document.createTextNode(convertGrade(resultsArray[x])));
				entgrades.appendChild(li);
			}

		document.getElementById("gradesasmarks").innerHTML = "" ;
		var gradesas = document.getElementById("gradesasmarks");
		for (x = 0; x < resultsArray.length; x++) {
			var gi = document.createElement("div");
			gi.appendChild(document.createTextNode(resultsArray[x]));
			gradesas.appendChild(gi);
			}
		
		//Lists the rest of the factors used in the calculation of the average overall grade
		document.getElementById("total").innerHTML = total.toFixed(2);
		document.getElementById("num_grades").innerHTML = numGrades;
		document.getElementById("average").innerHTML = averageResult.toFixed(3);
		document.getElementById("rounded").innerHTML = roundedResult;
		document.getElementById("output").innerHTML = output;
		
		//swaps the visibility of the input and output divs
		document.getElementById("calc").style.display = "none";
		document.getElementById("themath").style.display = "inline";
	
	clearGrades();
	}
}

function setActive() {
// Get the container element
var btnContainer = document.getElementById("numgrades");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("numgrade-button");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
}


function convertGrade(roundedResult) {
		
		switch(true) {
			
			case (roundedResult <= 100.00 && roundedResult >= 76.67):
				return "A+";
				break;
		
			case (roundedResult <= 76.66 && roundedResult >= 73.33):
				return "A";
				break;
		
			case (roundedResult <= 73.32 && roundedResult >= 70.00):
				return "A-";
				break;
				
			case (roundedResult <= 69.90 && roundedResult >= 66.67):
				return "B+";
				break;
				
			case (roundedResult <= 66.66 && roundedResult >= 63.33):
				return "B";
				break;
				
			case (roundedResult <= 63.32 && roundedResult >= 60.00):
				return "B-";
				break;
				
			case (roundedResult <= 59.99 && roundedResult >= 56.67):
				return "C+";
				break;
				
			case (roundedResult <= 56.66 && roundedResult >= 53.33):
				return "C";
				break;

			case (roundedResult <= 53.32 && roundedResult >= 50.00):
				return "C-";
				break;
				
			case (roundedResult <= 49.99 && roundedResult >= 46.67):
				return "D+";
				break;
				
			case (roundedResult <= 46.66 && roundedResult >= 43.33):
				return "D";
				break;

			case (roundedResult <= 43.32 && roundedResult >= 40.00):
				return "D-";
				break;
				
			case (roundedResult <= 39.99 && roundedResult >= 36.67):
				return "E+";
				break;
				
			case (roundedResult <= 36.66 && roundedResult >= 33.33):
				return "E";
				break;

			case (roundedResult <= 33.32 && roundedResult >= 30.00):
				return "E-";
				break;
				
			case (roundedResult <= 29.99 && roundedResult >= 26.67):
				return "F+";
				break;
				
			case (roundedResult <= 26.66 && roundedResult >= 23.33):
				return "F";
				break;

			case (roundedResult <= 23.32 && roundedResult >= 20.00):
				return "F-";
				break;

			case (roundedResult <= 19.99 && roundedResult >= 16.67):
				return "G+";
				break;
				
			case (roundedResult <= 16.66 && roundedResult >= 13.33):
				return "G";
				break;

			case (roundedResult <= 13.32 && roundedResult >= 0.02):
				return "G-";
				break;
				
			case (roundedResult <= 0.01):
				return "NG";
				break;
				
			default:
				break;
				///return "Something went wrong, for feck sake.";
		}
}
