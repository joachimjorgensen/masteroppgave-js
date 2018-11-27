function read_xml(){
	let text = '<?xml version="1.0" encoding="UTF-8"?><assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd" identifier="28416605" title="Ny oppgave" adaptive="false" timeDependent="false" xmlns:java="http://xml.apache.org/xalan/java" xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_v1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><responseDeclaration identifier="RESPONSE" cardinality="multiple" baseType="directedPair"><correctResponse></correctResponse><mapping defaultValue="0"></mapping></responseDeclaration><outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float"><defaultValue><value>0</value></defaultValue></outcomeDeclaration><outcomeDeclaration identifier="FEEDBACK" cardinality="single" baseType="identifier"/><templateDeclaration identifier="SCORE_EACH_CORRECT" cardinality="single" baseType="float"><defaultValue><value>1</value></defaultValue></templateDeclaration><templateDeclaration identifier="SCORE_EACH_WRONG" cardinality="single" baseType="float"><defaultValue><value>0</value></defaultValue></templateDeclaration><templateDeclaration identifier="SCORE_ALL_CORRECT" cardinality="single" baseType="float"><defaultValue><value/></defaultValue></templateDeclaration><templateDeclaration identifier="SCORE_MINIMUM" cardinality="single" baseType="float"><defaultValue><value/></defaultValue></templateDeclaration><templateDeclaration identifier="SCORE_UNANSWERED" cardinality="single" baseType="float"><defaultValue><value>0</value></defaultValue></templateDeclaration><itemBody inspera:defaultLanguage="no_no" inspera:supportedLanguages="no_no" xmlns:inspera="http://www.inspera.no/qti"><div class="question-main-illustration"></div><p style="">Fullfør denne dra og slipp oppgaven!</p><graphicGapMatchInteraction class="markHotspots " responseIdentifier="RESPONSE" inspera:canvasHeight="400" inspera:mode="IA"><prompt>Velg ett alternativ</prompt></graphicGapMatchInteraction><p style=""> </p></itemBody><responseProcessing><responseCondition><responseIf><and><isNull><variable identifier="RESPONSE"/></isNull></and><setOutcomeValue identifier="SCORE"><variable identifier="SCORE_UNANSWERED"/></setOutcomeValue></responseIf><responseElse><setOutcomeValue identifier="SCORE"><sum><variable identifier="SCORE"/><mapResponse identifier="RESPONSE"/></sum></setOutcomeValue></responseElse></responseCondition><responseCondition><responseIf><and><isNull><variable identifier="RESPONSE"/></isNull></and><setOutcomeValue identifier="FEEDBACK"><baseValue baseType="identifier">feedback_unanswered</baseValue></setOutcomeValue></responseIf><responseElseIf><and></and><setOutcomeValue identifier="FEEDBACK"><baseValue baseType="identifier">feedback_correct</baseValue></setOutcomeValue></responseElseIf><responseElseIf><or></or><setOutcomeValue identifier="FEEDBACK"><baseValue baseType="identifier">feedback_partially_correct</baseValue></setOutcomeValue></responseElseIf><responseElse><setOutcomeValue identifier="FEEDBACK"><baseValue baseType="identifier">feedback_wrong</baseValue></setOutcomeValue></responseElse></responseCondition><responseCondition inspera:type="max_score_upper_bound" xmlns:inspera="http://www.inspera.no/qti"><responseIf><and><gte><variable identifier="SCORE"/><baseValue baseType="float">3.0</baseValue></gte></and><setOutcomeValue identifier="SCORE"><baseValue baseType="float">3.0</baseValue></setOutcomeValue></responseIf></responseCondition></responseProcessing><modalFeedback outcomeIdentifier="FEEDBACK" identifier="feedback_unanswered" showHide="show">Ubesvart</modalFeedback><modalFeedback outcomeIdentifier="FEEDBACK" identifier="feedback_wrong" showHide="show">Galt svar</modalFeedback><modalFeedback outcomeIdentifier="FEEDBACK" identifier="feedback_correct" showHide="show">Riktig svar</modalFeedback><modalFeedback outcomeIdentifier="FEEDBACK" identifier="feedback_partially_correct" showHide="show">Delvis riktig svar</modalFeedback></assessmentItem>';
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(text,"text/xml");
	return xmlDoc;
}

function read_manifest(){
    let text = '<?xml version="1.0" encoding="UTF-8"?><manifest identifier="MANIFEST" version="1.1" xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:java="http://xml.apache.org/xalan/java" xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_v1p2"><metadata><imsmd:lom><imsmd:lifecycle><imsmd:status><imsmd:source><imsmd:langstring xml:lang="x-none">LOMv1.0</imsmd:langstring></imsmd:source><imsmd:value><imsmd:langstring xml:lang="x-none">Draft</imsmd:langstring></imsmd:value></imsmd:status></imsmd:lifecycle></imsmd:lom></metadata><resources><resource identifier="ID_28416605" type="imsqti_item_xmlv2p1" href="content_question_qti2_graphicgapmatch_28416605.xml"><metadata><imsmd:lom><imsmd:general><imsmd:identifier/><imsmd:title><imsmd:langstring xml:lang="no">Ny oppgave</imsmd:langstring></imsmd:title></imsmd:general></imsmd:lom></metadata><file href="content_question_qti2_graphicgapmatch_28416605.xml"/></resource></resources></manifest>';
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(text,"text/xml");
	return xmlDoc;
}

function write_xml(xmlDoc,taskIdentifier){
    let serializer = new XMLSerializer();
    let xmlString = serializer.serializeToString(xmlDoc);
    let fs = require('fs');
	fs.writeFile('zipThis/content_question_qti2_graphicgapmatch_'+taskIdentifier+'.xml', xmlString, function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
}
function write_manifest(xmlDoc){
    let serializer = new XMLSerializer();
    let xmlString = serializer.serializeToString(xmlDoc);
    let fs = require('fs');
	fs.writeFile('zipThis/imsmanifest.xml', xmlString, function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The manifest was saved!");
	});
}

function add_manifest_data(myManifest, identifiers, taskNames){
	if(Array.isArray(identifiers)){
		let identifier = identifiers[0];
		let taskName = taskNames[0];
		let fileName = 'content_question_qti2_graphicgapmatch_' + identifier + '.xml';
		let manifestTag = myManifest.getElementsByTagName('manifest')[0];
		let resourcesTag = manifestTag.getElementsByTagName('resources')[0];
		let resourceTag = resourcesTag.getElementsByTagName('resource')[0];

		//Name
		let metadata = resourceTag.getElementsByTagName('metadata')[0];
		let lom = metadata.getElementsByTagName('imsmd:lom')[0];
		let general= lom.getElementsByTagName('imsmd:general')[0];
		let title = general.getElementsByTagName('imsmd:title')[0];
		let langstring = title.getElementsByTagName('imsmd:langstring')[0];
		langstring.firstChild.nodeValue = taskName;

		addAttribute(resourceTag, "identifier", "ID_" + identifier);
		addAttribute(resourceTag, "href", fileName);
		let fileTag = resourceTag.getElementsByTagName('file')[0];
		addAttribute(fileTag, "href", fileName);

		if(identifiers.length>1){
			for (let i = 1; i < identifiers.length; i++) {
				let identifier = identifiers[i];
				let taskName = taskNames[1];
				let fileName = 'content_question_qti2_graphicgapmatch_' + identifier + '.xml';
				let cloneResourceTag = resourceTag.cloneNode(true);

				//Name
				let metadata = cloneResourceTag.getElementsByTagName('metadata')[0];
				let lom = metadata.getElementsByTagName('imsmd:lom')[0];
				let general = lom.getElementsByTagName('imsmd:general')[0];
				let title = general.getElementsByTagName('imsmd:title')[0];
				let langstring = title.getElementsByTagName('imsmd:langstring')[0];
				langstring.firstChild.nodeValue = taskName;

				addAttribute(cloneResourceTag, "identifier", "ID_" + identifier);
				addAttribute(cloneResourceTag, "href", fileName);
				let fileTag = cloneResourceTag.getElementsByTagName('file')[0];
				addAttribute(fileTag, "href", fileName);

				resourcesTag.appendChild(cloneResourceTag);

			}
		}
	}else{
		let identifier = identifiers;
		let taskName = taskNames;
		let fileName = 'content_question_qti2_graphicgapmatch_' + identifier + '.xml';
		let manifestTag = myManifest.getElementsByTagName('manifest')[0];
		let resourcesTag = manifestTag.getElementsByTagName('resources')[0];
		let resourceTag = resourcesTag.getElementsByTagName('resource')[0];

		//Name
		let metadata = resourceTag.getElementsByTagName('metadata')[0];
		let lom = metadata.getElementsByTagName('imsmd:lom')[0];
		let general= lom.getElementsByTagName('imsmd:general')[0];
		let title = general.getElementsByTagName('imsmd:title')[0];
		let langstring = title.getElementsByTagName('imsmd:langstring')[0];
		langstring.firstChild.nodeValue = taskName;

		addAttribute(resourceTag, "identifier", "ID_" + identifier);
		addAttribute(resourceTag, "href", fileName);
		let fileTag = resourceTag.getElementsByTagName('file')[0];
		addAttribute(fileTag, "href", fileName);
	}

}

function add_metadata(myDoc, identifier, taskTitle, parsons2D){
	//MAIN FILE
	let ai = myDoc.getElementsByTagName('assessmentItem');
	let assessmentItem = ai[0];
	//responseDeclarations = assessmentItem[0].getElementsByTagName('responseDeclaration')
	addAttribute(assessmentItem, "identifier", identifier)
	addAttribute(assessmentItem, "title", taskTitle)


	let newTitleTextNO = "Fullfor denne kule oppgaven!";
	let newPromptTextNO = "NB! Husk holde i midten!";
	/*
	Lets do all in norwegian!
	let newTitleTextNY = "Fullfori dykkja oppgavi!";
	let newTitleTextEN = "Complete this awesome task!";

	let newPromptTextNY = "NB! Huski holde i midkja!";
	let newPromptTextEN = "NB! Remember to hold in middle!";
	*/

	let itemBody = assessmentItem.getElementsByTagName('itemBody')[0];
	addAttribute(itemBody, "inspera:defaultLanguage","no_no");
	addAttribute(itemBody, "inspera:supportedLanguages","no_no,en_us,no_no_ny");

	//Set title text
	let title = itemBody.getElementsByTagName('p');
	title[0].firstChild.data = newTitleTextNO;

	let englishTitle = addChildWithValue(myDoc, itemBody, "p", newTitleTextNO);
	addAttribute(englishTitle,"lang","en_us");
	addAttribute(englishTitle,"style","display: none;");
	itemBody.insertBefore(englishTitle, title[0]); //Place the p in front of norwegian/original p

	let nynorskTitle = addChildWithValue(myDoc, itemBody, "p", newTitleTextNO);
	addAttribute(nynorskTitle,"lang","no_no_ny");
	addAttribute(nynorskTitle,"style","display: none;");
	itemBody.insertBefore(nynorskTitle, title[0]);

	let graphicGapMatchInteraction = assessmentItem.getElementsByTagName('graphicGapMatchInteraction')[0];

	//Set canvas height
	//Should do here, but the canvasHeight is in generate_python_lines instead, so im doing it there
	//addAttribute(graphicGapMatchInteraction, "inspera:canvasHeight",canvasHeight.toString());

	//Set freeplacing
	if(!parsons2D){
		addAttribute(graphicGapMatchInteraction, "class", "freeplacing markHotspots")
	}
	//Set prompt text
	let prompt = graphicGapMatchInteraction.getElementsByTagName("prompt")[0];
	addAttribute(prompt, "inspera:label-lang-no_no",newPromptTextNO);
	addAttribute(prompt, "inspera:label-lang-en_us",newPromptTextNO);
	addAttribute(prompt, "inspera:label-lang-no_no_ny",newPromptTextNO);
	prompt.firstChild.data = newPromptTextNO;
}

function add_empty_hotspot(myDoc, hotspotX, hotspotY, hotspotWidth, hotspotHeight){
	let newAssociableHotspotName = "associableHotspot"+generateID();
	let hotspotCoords = hotspotX.toString()+","+hotspotY.toString()+","+(hotspotX+hotspotWidth).toString()+","+(hotspotY+hotspotHeight).toString();

	let assessmentItem = myDoc.getElementsByTagName('assessmentItem');
	let graphicGapMatchInteraction = assessmentItem[0].getElementsByTagName('graphicGapMatchInteraction')[0];


	//Create associableHotspot
	let associableHotspot = addChildWithAttribute(myDoc, graphicGapMatchInteraction, "associableHotspot", "coords", hotspotCoords);
	addAttribute(associableHotspot,"identifier",newAssociableHotspotName);
	addAttribute(associableHotspot,"hotspotLabel","1");
	addAttribute(associableHotspot,"shape","rect");
	addAttribute(associableHotspot,"matchMax","0");

}
function add_draggable_pair(myDoc, textInBox, boxX1, boxY1, boxWidth1, boxHeight1, hotspotX, hotspotY, hotspotWidth, hotspotHeight, canvasHeight,parsons2D){
	let boxX = boxX1.toString();
	let boxY = boxY1.toString();
	let boxWidth = get_length_of_word(textInBox).toString(); //str(len(textInBox)*10) #str(boxWidth)
	let boxHeight = boxHeight1.toString();
	let newGapImgName = "gapImg"+generateID();
	let newAssociableHotspotName = "associableHotspot"+generateID();
	let newGA = newGapImgName + " " + newAssociableHotspotName;
	//let newTitleText = "Fullfor denne kule oppgaven!";
	//let newPromptText = "Velg ett alternativ!";
	let hotspotCoords = hotspotX.toString()+","+hotspotY.toString()+","+(hotspotX+hotspotWidth).toString()+","+(hotspotY+hotspotHeight).toString();

	let assessmentItem = myDoc.getElementsByTagName('assessmentItem');
	let responseDeclarations = assessmentItem[0].getElementsByTagName('responseDeclaration');


	//Add value to correctResponses
	let correctResponses = responseDeclarations[0].getElementsByTagName('correctResponse');
	addChildWithValue(myDoc, correctResponses[0], "value", newGA);

	//Add mapEntry to mapping
	let mapping = responseDeclarations[0].getElementsByTagName('mapping');
	let ele = addChildWithAttribute(myDoc, mapping[0], "mapEntry","mapKey", newGA);
	addAttribute(ele, "mappedValue","1");

	//Add responseDecleration
	let rd = addChildWithAttribute(myDoc, assessmentItem[0], "responseDeclaration", "baseType", "point");
	addAttribute(rd,"cardinality","single");
	addAttribute(rd,"identifier",newGapImgName);

	//Set title text
	//let title = assessmentItem[0].getElementsByTagName('p');
	//title[0].firstChild.data = newTitleText;

	
	let graphicGapMatchInteraction = assessmentItem[0].getElementsByTagName('graphicGapMatchInteraction')[0];

	//Set canvas height
	addAttribute(graphicGapMatchInteraction, "inspera:canvasHeight",canvasHeight.toString());
	/*
	//Set freeplacing
	if(!parsons2D){
		addAttribute(graphicGapMatchInteraction, "class", "freeplacing markHotspots")
	}
	//Set prompt text
	let prompt = graphicGapMatchInteraction.getElementsByTagName("prompt")[0];
	prompt.firstChild.data = newPromptText;
	*/

	//Create gap image
	/*
	<gapImg identifier="gapImg__361670718761" matchMax="">
            <object x="250" y="140" width="68" height="58">
                
                    <div class="text">
                        <p> I</p>
                    </div>
                
            </object>
        </gapImg>
	*/
	let gi = addChildWithAttribute(myDoc, graphicGapMatchInteraction, "gapImg", "identifier", newGapImgName);
	addAttribute(gi,"matchMax","");

	let obj = addChildWithAttribute(myDoc, gi, "object","x",boxX);
	addAttribute(obj,"y",boxY);
	addAttribute(obj,"width",boxWidth);
	addAttribute(obj,"height",boxHeight);

	let div = addChildWithAttribute(myDoc, obj, "div", "class", "text");
	addChildWithValue(myDoc, div, "p", textInBox);
	addAttribute(div, "inspera:label-lang-en_us",textInBox);
	addAttribute(div, "inspera:label-lang-no_no_ny",textInBox);


	//Create associableHotspot
	let associableHotspot = addChildWithAttribute(myDoc, graphicGapMatchInteraction, "associableHotspot", "coords", hotspotCoords);
	addAttribute(associableHotspot,"identifier",newAssociableHotspotName);
	addAttribute(associableHotspot,"hotspotLabel","1");
	addAttribute(associableHotspot,"shape","rect");
	addAttribute(associableHotspot,"matchMax","0");

	//ResponseProcessing and isNull
	let responseProcessing = assessmentItem[0].getElementsByTagName('responseProcessing')[0];
	let responseConditions = responseProcessing.getElementsByTagName('responseCondition');
	//ResponseCondition 1
	let andResponse = responseConditions[0].getElementsByTagName('and')[0];
	let isNull = addChildWithValue(myDoc, andResponse, "isNull", "");
	addChildWithAttribute(myDoc, isNull, "variable", "identifier", newGapImgName);
	//ResponseCondition 2
	andResponse = responseConditions[1].getElementsByTagName('and')[0];
	isNull = addChildWithValue(myDoc, andResponse, "isNull", "");
	addChildWithAttribute(myDoc, isNull, "variable", "identifier", newGapImgName);
	
	let responseElseIfs = responseConditions[1].getElementsByTagName('responseElseIf');
	//ResponseElseIf 1
	andResponse = responseElseIfs[0].getElementsByTagName('and')[0];
	let member = addChildWithValue(myDoc, andResponse, "member", "");
	let baseValue = addChildWithValue(myDoc, member, "baseValue", newGA);
	addAttribute(baseValue, "baseType", "directedPair");
	addChildWithAttribute(myDoc, member, "variable", "identifier","RESPONSE");

	//ResponseElseIf 1
	let orResponse = responseElseIfs[1].getElementsByTagName('or')[0];
	member = addChildWithValue(myDoc, orResponse, "member", "");
	baseValue = addChildWithValue(myDoc, member, "baseValue", newGA);
	addAttribute(baseValue, "baseType", "directedPair");
	addChildWithAttribute(myDoc, member, "variable", "identifier","RESPONSE");
}
function add_distractor(myDoc, textInBox, boxX1, boxY1, boxWidth1, boxHeight1){
	let boxX = boxX1.toString();
	let boxY = boxY1.toString();
	let boxWidth = get_length_of_word(textInBox).toString(); //str(len(textInBox)*10) #str(boxWidth)
	let boxHeight = boxHeight1.toString();
	let newGapImgName = "gapImg"+generateID();

	let assessmentItem = myDoc.getElementsByTagName('assessmentItem');
	let responseDeclarations = assessmentItem[0].getElementsByTagName('responseDeclaration');


	//Add value to correctResponses
	/*
	let correctResponses = responseDeclarations[0].getElementsByTagName('correctResponse');
	addChildWithValue(myDoc, correctResponses[0], "value", newGA);

	//Add mapEntry to mapping
	let mapping = responseDeclarations[0].getElementsByTagName('mapping');
	let ele = addChildWithAttribute(myDoc, mapping[0], "mapEntry","mapKey", newGA);
	addAttribute(ele, "mappedValue","1");
	*/

	//Add responseDecleration
	let rd = addChildWithAttribute(myDoc, assessmentItem[0], "responseDeclaration", "baseType", "point");
	addAttribute(rd,"cardinality","single");
	addAttribute(rd,"identifier",newGapImgName);


	let graphicGapMatchInteraction = assessmentItem[0].getElementsByTagName('graphicGapMatchInteraction')[0];

	//Set canvas height
	//addAttribute(graphicGapMatchInteraction, "inspera:canvasHeight",canvasHeight.toString());

	//Set freeplacing
	if(!parsons2D){
		addAttribute(graphicGapMatchInteraction, "class", "freeplacing markHotspots")
	}
	//Set prompt text
	//let prompt = graphicGapMatchInteraction.getElementsByTagName("prompt")[0];
	//prompt.firstChild.data = newPromptText;

	//Create gap image
	/*
	<gapImg identifier="gapImg__361670718761" matchMax="">
            <object x="250" y="140" width="68" height="58">
                
                    <div class="text">
                        <p> I</p>
                    </div>
                
            </object>
        </gapImg>
	*/
	let gi = addChildWithAttribute(myDoc, graphicGapMatchInteraction, "gapImg", "identifier", newGapImgName);
	addAttribute(gi,"matchMax","");

	let obj = addChildWithAttribute(myDoc, gi, "object","x",boxX);
	addAttribute(obj,"y",boxY);
	addAttribute(obj,"width",boxWidth);
	addAttribute(obj,"height",boxHeight);

	let div = addChildWithAttribute(myDoc, obj, "div", "class", "text");
	addChildWithValue(myDoc, div, "p", textInBox);
	addAttribute(div, "inspera:label-lang-en_us",textInBox);
	addAttribute(div, "inspera:label-lang-no_no_ny",textInBox);


	//Create associableHotspot
	/*
	let associableHotspot = addChildWithAttribute(myDoc, graphicGapMatchInteraction, "associableHotspot", "coords", hotspotCoords);
	addAttribute(associableHotspot,"identifier",newAssociableHotspotName);
	addAttribute(associableHotspot,"hotspotLabel","1");
	addAttribute(associableHotspot,"shape","rect");
	addAttribute(associableHotspot,"matchMax","0");
	*/

	//ResponseProcessing and isNull
	let responseProcessing = assessmentItem[0].getElementsByTagName('responseProcessing')[0];
	let responseConditions = responseProcessing.getElementsByTagName('responseCondition');
	//ResponseCondition 1
	let andResponse = responseConditions[0].getElementsByTagName('and')[0];
	let isNull = addChildWithValue(myDoc, andResponse, "isNull", "");
	addChildWithAttribute(myDoc, isNull, "variable", "identifier", newGapImgName);
	//ResponseCondition 2
	andResponse = responseConditions[1].getElementsByTagName('and')[0];
	isNull = addChildWithValue(myDoc, andResponse, "isNull", "");
	addChildWithAttribute(myDoc, isNull, "variable", "identifier", newGapImgName);
	
	let responseElseIfs = responseConditions[1].getElementsByTagName('responseElseIf');
	//ResponseElseIf 1
	andResponse = responseElseIfs[0].getElementsByTagName('and')[0];
	//let member = addChildWithValue(myDoc, andResponse, "member", "");
	//let baseValue = addChildWithValue(myDoc, member, "baseValue", newGA);
	//addAttribute(baseValue, "baseType", "directedPair");
	//addChildWithAttribute(myDoc, member, "variable", "identifier","RESPONSE");

	//ResponseElseIf 1
	//let orResponse = responseElseIfs[1].getElementsByTagName('or')[0];
	//member = addChildWithValue(myDoc, orResponse, "member", "");
	//baseValue = addChildWithValue(myDoc, member, "baseValue", newGA);
	//addAttribute(baseValue, "baseType", "directedPair");
	//addChildWithAttribute(myDoc, member, "variable", "identifier","RESPONSE");
}

function generateID(){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		  .toString(16)
		  .substring(1);
	  }
	  return '_'+s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function get_length_of_word(word){
	let tot = 0;
	let short = ["(",")",".",",",":",";","'","|","/","\\"," ","!","\"","´","`","{","}","]","[","l","i","j","t","I","J"];
	for (let i = 0; i < word.length; i++) {
		let c = word.charAt(i);
		if(short.indexOf(c)>=0){
			tot += 4.5
		}
		else if(c == c.toUpperCase()){
			tot += 10.5
		}
		else if(isLetter(c)){
			tot += 9
		}
		else{
			tot += 10
		}
	}
	return tot
}
function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

function getMaxTabs(lines, tabSize){
	let maxTabs = 0;
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		let num = countTabs(line,tabSize);
		if(num>maxTabs){
			maxTabs = num
		}
	}
	return maxTabs
}

function findTabSize(lines){
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		let trimmed = line.trimLeft(" ");
		let ts = line.length - trimmed.length;
		if(ts > 1){
			return ts;
		}
	}
	return 4;
}

function countTabs(line,tabSize){
	let numTabs = (line.split("\t").length - 1); //Count occurances of \t
	let trimmed = line.trimLeft(" ");
	let numSpaces = (line.length - trimmed.length)/tabSize;
	if(numSpaces>numTabs){
		return numSpaces;
	}else{
		return numTabs;
	}
}

function stripMe(line){
	return line.trim(); //Should remove \t \n and " "
}

function generateStartOptions(lines, height,distractors){
	let longestLine = 0;
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		let x = get_length_of_word(line);
		if(x > longestLine){
			longestLine = x;
		}
	}
	for (let i = 0; i<distractors.length; i++){
		let distractor = distractors[i];
		let x = get_length_of_word(distractor);
		if(x > longestLine){
			longestLine = x;
		}
	}

	let maxWidth = 600;
	let maxOptionsEachLine = Math.floor((maxWidth/(longestLine+30)));
	let xOptions = [];
	for (x = 0; x < maxOptionsEachLine; x++) { 
		//xOptions.push((maxWidth-(maxWidth/(x+1)))+30);
		xOptions.push((maxWidth/maxOptionsEachLine)*x + 30);
	}
	let startOptions = [];
	startY = (height*3)+(lines.length * height);
	let counter = 0;
	let yCounter = 0;
	for (let i = 0; i < lines.length+distractors.length; i++) {
		startOptions.push([xOptions[counter],startY+((height*1.5)*yCounter)]);

		counter ++;
		if(counter == maxOptionsEachLine){
			counter = 0;
			yCounter ++;
		}
	}
	return startOptions;
}
function getRandomInt(max) {
	let rand = Math.floor(Math.random() * Math.floor(max));
	return rand;
  }
function generate_python_lines(myDoc,lines,parsons2D,distractors){
	let startY = 50;
	if(parsons2D){
		let width = 40;
		let height = 30;
		let startOptions = generateStartOptions(lines,height,distractors);
		let canvasHeight = startOptions[startOptions.length-1][1]+100;
		let tabSize = findTabSize(lines);
		let maxTabs = getMaxTabs(lines,tabSize);
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];

			let tabs = countTabs(line,tabSize);
			let theString = stripMe(line);
			let startOptionPair = startOptions.splice(getRandomInt(startOptions.length-1),1)[0];
			//let startOptionPair = startOptions.pop();
			for (let i = 0; i < maxTabs+1; i++){
				let startX = 220+(width*i)+i;
				if(i==tabs){
					add_draggable_pair(myDoc,theString,startOptionPair[0],startOptionPair[1],width,height,startX,startY,width,height,canvasHeight,parsons2D);
				}else{
					add_empty_hotspot(myDoc,startX,startY,width,height);
				}
			}
			startY += height +1;
		}
		for (let i = 0; i< distractors.length; i++){
			let startOptionPair = startOptions.splice(getRandomInt(startOptions.length-1),1)[0];
			//let startOptionPair = startOptions.pop();
			add_distractor(myDoc,distractors[i],startOptionPair[0],startOptionPair[1],10,height);
		}
	}else{
		let width = 500;
		let height = 30;
		let startOptions = generateStartOptions(lines,height,distractors);
		let canvasHeight = startOptions[startOptions.length-1][1]+100;
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			let theString = stripMe(line);
			let startOptionPair = startOptions.pop(getRandomInt(startOptions.length-1));
			let startX = 50;
			add_draggable_pair(myDoc,theString,startOptionPair[0],startOptionPair[1],width,height,startX,startY,width,height, canvasHeight, parsons2D);
			startY += height+1;
		}
		for (let i = 0; i< distractors.length; i++){
			//let startOptionPair = startOptions.pop(getRandomInt(startOptions.length-1));
			let startOptionPair = startOptions.splice(getRandomInt(startOptions.length-1),1)[0];
			add_distractor(myDoc,distractors[i],startOptionPair[0],startOptionPair[1],10,height);
		}
	}
}



//<value>SIMON E KUL</value>
function addChildWithValue(myDoc, parent, childName, value){
	let newEle = myDoc.createElement(childName);
	let newText = myDoc.createTextNode(value);
	newEle.appendChild(newText);
	parent.appendChild(newEle);
	return newEle
}

//<mapEntry bla="bla"/>
function addChildWithAttribute(myDoc, parent, elementName, attributeName, value){
	let newEle = myDoc.createElement(elementName);
	newEle.setAttribute(attributeName, value);
	parent.appendChild(newEle);
	return newEle
}
//<mapEntry bla="bla" ny="attributt"/>
function addAttribute(element, attributeName, value){
	element.setAttribute(attributeName, value);
	return element
}

function run_dnd(jsonObject, filepath){
	//npm i rimraf
	let rimraf = require('rimraf');
	rimraf('zipThis', function () { continue_dnd(jsonObject, filepath);console.log('zipThis deleted'); });


}
function continue_dnd(dataAll, filepath){
	//npm install mkdirp
	let mkdirp = require('mkdirp');
	mkdirp('./zipThis', function (err) {
		console.log("Create file errors:"+err);
	});
	let myManifest = read_manifest();
	let distractors = ["Hello ima distractor","Distractiiiing","LOOOK HERE MOFO"];


	if(Array.isArray(dataAll)){
		console.log("Download multiple tasks");
		//zipFileName=fileName;
		taskIdentifiers = [];
		taskNames = [];

		for(let i = 0; i< dataAll.length; i++){
			data = dataAll[i];

			parsons2D = data.parsons2d;
			lines = data.code;
			console.log(data);
			lines = lines.split("\n");

			let taskIdentifier = generateID();
			taskIdentifiers.push(taskIdentifier);

			taskNames.push(data.fileName)

			let myDoc = read_xml();
			add_metadata(myDoc, taskIdentifier, data.fileName, parsons2D);
			generate_python_lines(myDoc, lines, parsons2D,distractors);

			write_xml(myDoc, taskIdentifier);
		}
		add_manifest_data(myManifest,taskIdentifiers, taskNames);
	}else{
        data = dataAll;
		console.log("Download one task");
		console.log(data);
		//zipFileName = fileName;
		parsons2D = data.parsons2d;
		lines = data.code;
		lines = lines.split("\n");

		let taskIdentifier = generateID();
		let myDoc = read_xml();

		add_metadata(myDoc, taskIdentifier, data.fileName, parsons2D);
		generate_python_lines(myDoc, lines, parsons2D, distractors);

		write_xml(myDoc, taskIdentifier);
		add_manifest_data(myManifest,taskIdentifier, data.fileName);

	}
	write_manifest(myManifest);


	setTimeout(function(){zipAndDelete(filepath)},1000);

	
}
function zipAndDelete(filepath){
	let zipFolder = require('zip-folder');
	console.log(filepath);
	//zipFolder('zipThis', filepath + '/' + zipFileName + '.zip', function (err) {
	zipFolder('zipThis', filepath+'.zip', function (err) {
		if (err) {
			console.log('Error zip folder: ', err);
		} else {
			console.log('Zip folder successful!');
		}
	});

	let rimraf = require('rimraf');
	//Uncomment this if you want zipThis to be deleted
	//rimraf('zipThis', function () { continue_dnd(jsonObject, filepath, fileName);console.log('zipThis deleted'); });

}