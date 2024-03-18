function initializeMap() {
			var placeholderDiv = document.getElementById("tableauViz");
			var url = "https://public.tableau.com/views/NETester_v1_1_1/Map";
			var options = {
				//width: placeholderDiv.offsetWidth,
				//height: placeholderDiv.offsetHeight,
				hideTabs: true,
				hideToolbar: true,
				onFirstInteractive: function () {
					workbook = viz.getWorkbook();
					activeSheet = workbook.getActiveSheet();
					//listenToMarksSelection();
				}
			};
			viz = new tableau.Viz(placeholderDiv, url, options);
		}    

		function initializeTable() {
			var placeholderDiv = document.getElementById("tableauViz");
			var url = "https://public.tableau.com/views/NETester_v1_1_1/DataTable";
			var options = {
				//width: placeholderDiv.offsetWidth,
				//height: placeholderDiv.offsetHeight,
				hideTabs: true,
				hideToolbar: true,
				onFirstInteractive: function () {
					workbook = viz.getWorkbook();
					activeSheet = workbook.getActiveSheet();
					//listenToMarksSelection();
				}
			};
			viz = new tableau.Viz(placeholderDiv, url, options);
		}    		
		
		//MARK FOR DELETION!!!!!!
			
		/*function listenToMarksSelection() {
            viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);
        }

        function onMarksSelection(marksEvent) {
            return marksEvent.getMarksAsync().then(reportSelectedMarks);
        }

        function reportSelectedMarks(marks) {
            var html = "";

            for (var markIndex = 0; markIndex < marks.length; markIndex++) {
                var pairs = marks[markIndex].getPairs();
                html += "<b>Mark " + markIndex + ":</b><ul>";

                for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
                    var pair = pairs[pairIndex];
                    html += "<li><b>Field Name:</b> " + pair.fieldName;
                    html += "<br/><b>Value:</b> " + pair.formattedValue + "</li>";
                }

                html += "</ul>";
            }
			
			var population = pairs[7].value;
			var prevalence = pairs[8].value;
			
			console.log(prevalence/population);
        }*/
		
		function copyToClipboard(elementId) {

		// Create a "hidden" input
		var aux = document.createElement("input");

		// Assign it the value of the specified element
		aux.setAttribute("value", document.getElementById(elementId).innerHTML);

		// Append it to the body
		document.body.appendChild(aux);

		// Highlight its content
		aux.select();

		// Copy the highlighted text
		document.execCommand("copy");

		// Remove it from the body
		document.body.removeChild(aux);
		
		$("#copyMessage").show().delay(1000).toggle("fade");

	}
		

		// Display information about selected marks.
        async function handleMarksSelection(e) {
            const marksCollection = await e.detail.getMarksAsync();
            const marksData = marksCollection.data[0];
            let html = "";
		

            for (let markIndex = 0; markIndex < marksData.totalRowCount; markIndex++) {
                html += `<b>Mark ${markIndex}:</b><ul>`;

                for (let columnIndex = 3; columnIndex < 4; columnIndex++) {
                    html += `<li><b>Field Name:</b> ${marksData.columns[columnIndex].fieldName}`;
                    html += `<br/><b>Value:</b> ${marksData.data[markIndex][columnIndex].formattedValue} </li>`;
					var name = marksData.data[markIndex][columnIndex].formattedValue;
                }
            }
			console.log(name);
		
			var sheet = viz.getWorkbook().getActiveSheet();
			sheet.applyFilterAsync("Name", name, tableau.FilterUpdateType.ADD);
			
        }