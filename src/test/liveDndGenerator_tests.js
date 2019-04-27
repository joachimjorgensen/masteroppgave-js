const passedString = "✅ Test passed: ";
const failedString = "❌ TEST FAILED: ";

function run_all_dnd_generator_tests() {
	properly_log("Testing read_xml() function", test_read_xml());
	properly_log("Testing read_manifest() function", test_read_manifest());
	properly_log("Testing add_manifest_data() function with a single task", test_add_manifest_data_single());
	properly_log("Testing add_manifest_data() function with a list of tasks", test_add_manifest_data_list());
	properly_log("Testing addLanguageToAllTags() function ", test_add_language_to_all_tags());
	properly_log("Testing add_metadata() function ", test_add_metadata());
	properly_log("Testing add_add_empty_hotspot() function ", test_add_empty_hotspot());
	properly_log("Testing add_draggable_pair() function ", test_add_draggable_pair());
	properly_log("Testing connectDragAreaToDropArea() function ", test_connect_drag_area_to_drop_area());
	properly_log("Testing add_distractor() function ", test_add_distractor());
	properly_log("Testing getTextWidth() function ", test_get_text_width());
	properly_log("Testing get_length_of_word() function ", test_get_length_of_word());
	properly_log("Testing generateStartOptions() function ", test_generate_start_options());
	properly_log("Testing addChildWithValue() function ", test_add_child_with_value());
	properly_log("Testing addChildWithAttribute() function ", test_add_child_with_attribute());
	properly_log("Testing addAttribute() function ", test_add_attribute());
}
function properly_log(text, passed) {
	if (passed) {
		console.log(passedString + text);
	} else {
		console.log(failedString + text);
	}

}

function test_read_xml() {

	let text = '<?xml version="1.0" encoding="UTF-8"?><assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd" identifier="28416605" title="Ny oppgave" adaptive="false" timeDependent="false" xmlns:java="http://xml.apache.org/xalan/java" xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_v1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><responseDeclaration identifier="RESPONSE" cardinality="multiple" baseType="directedPair"><correctResponse></correctResponse><mapping defaultValue="0"></mapping></responseDeclaration><outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float"><defaultValue><value>0</value></defaultValue></outcomeDeclaration><outcomeDeclaration identifier="FEEDBACK" cardinality="single" baseType="identifier"/><templateDeclaration identifier="SCORE_EACH_CORRECT" cardinality="single" baseType="float"><defaultValue><value>1</value></defaultValue></templateDeclaration><templateDeclaration identifier="SCORE_EACH_WRONG" cardinality="single" baseType="float"><defaultValue><value>0</value></defaultValue></templateDeclaration><templateDeclaration identifier="SCORE_ALL_CORRECT" cardinality="single" baseType="float"><defaultValue><value/></defaultValue></templateDeclaration><templateDeclaration identifier="SCORE_MINIMUM" cardinality="single" baseType="float"><defaultValue><value/></defaultValue></templateDeclaration><templateDeclaration identifier="SCORE_UNANSWERED" cardinality="single" baseType="float"><defaultValue><value>0</value></defaultValue></templateDeclaration><itemBody inspera:defaultLanguage="no_no" inspera:supportedLanguages="no_no" xmlns:inspera="http://www.inspera.no/qti"><div class="question-main-illustration"></div><p style="">Fullfør denne dra og slipp oppgaven!</p><graphicGapMatchInteraction class="markHotspots " responseIdentifier="RESPONSE" inspera:canvasHeight="400" inspera:mode="IA"><prompt>Velg ett alternativ</prompt></graphicGapMatchInteraction><p style=""> </p></itemBody><responseProcessing><responseCondition><responseIf><and><isNull><variable identifier="RESPONSE"/></isNull></and><setOutcomeValue identifier="SCORE"><variable identifier="SCORE_UNANSWERED"/></setOutcomeValue></responseIf><responseElse><setOutcomeValue identifier="SCORE"><sum><variable identifier="SCORE"/><mapResponse identifier="RESPONSE"/></sum></setOutcomeValue></responseElse></responseCondition><responseCondition><responseIf><and><isNull><variable identifier="RESPONSE"/></isNull></and><setOutcomeValue identifier="FEEDBACK"><baseValue baseType="identifier">feedback_unanswered</baseValue></setOutcomeValue></responseIf><responseElseIf><and></and><setOutcomeValue identifier="FEEDBACK"><baseValue baseType="identifier">feedback_correct</baseValue></setOutcomeValue></responseElseIf><responseElseIf><or></or><setOutcomeValue identifier="FEEDBACK"><baseValue baseType="identifier">feedback_partially_correct</baseValue></setOutcomeValue></responseElseIf><responseElse><setOutcomeValue identifier="FEEDBACK"><baseValue baseType="identifier">feedback_wrong</baseValue></setOutcomeValue></responseElse></responseCondition><responseCondition inspera:type="max_score_upper_bound" xmlns:inspera="http://www.inspera.no/qti"><responseIf><and><gte><variable identifier="SCORE"/><baseValue baseType="float">3.0</baseValue></gte></and><setOutcomeValue identifier="SCORE"><baseValue baseType="float">3.0</baseValue></setOutcomeValue></responseIf></responseCondition></responseProcessing><modalFeedback outcomeIdentifier="FEEDBACK" identifier="feedback_unanswered" showHide="show">Ubesvart</modalFeedback><modalFeedback outcomeIdentifier="FEEDBACK" identifier="feedback_wrong" showHide="show">Galt svar</modalFeedback><modalFeedback outcomeIdentifier="FEEDBACK" identifier="feedback_correct" showHide="show">Riktig svar</modalFeedback><modalFeedback outcomeIdentifier="FEEDBACK" identifier="feedback_partially_correct" showHide="show">Delvis riktig svar</modalFeedback></assessmentItem>';

	let parser = new DOMParser();
	let xmlDoc = parser.parseFromString(text, "text/xml");

	let x = read_xml();

	let serializer = new XMLSerializer();
	let xmlString1 = serializer.serializeToString(xmlDoc);
	let xmlString2 = serializer.serializeToString(x);

	return (xmlString1 === xmlString2);
}
function test_read_manifest() {

	let text = '<?xml version="1.0" encoding="UTF-8"?><manifest identifier="MANIFEST" version="1.1" xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:java="http://xml.apache.org/xalan/java" xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_v1p2"><metadata><imsmd:lom><imsmd:lifecycle><imsmd:status><imsmd:source><imsmd:langstring xml:lang="x-none">LOMv1.0</imsmd:langstring></imsmd:source><imsmd:value><imsmd:langstring xml:lang="x-none">Draft</imsmd:langstring></imsmd:value></imsmd:status></imsmd:lifecycle></imsmd:lom></metadata><resources><resource identifier="ID_28416605" type="imsqti_item_xmlv2p1" href="content_question_qti2_graphicgapmatch_28416605.xml"><metadata><imsmd:lom><imsmd:general><imsmd:identifier/><imsmd:title><imsmd:langstring xml:lang="no">Ny oppgave</imsmd:langstring></imsmd:title></imsmd:general></imsmd:lom></metadata><file href="content_question_qti2_graphicgapmatch_28416605.xml"/></resource></resources></manifest>';

	let parser = new DOMParser();
	let xmlDoc = parser.parseFromString(text, "text/xml");

	let x = read_manifest();

	let serializer = new XMLSerializer();
	let xmlString1 = serializer.serializeToString(xmlDoc);
	let xmlString2 = serializer.serializeToString(x);

	return (xmlString1 === xmlString2);
}

function test_add_manifest_data_single() {
	let x = read_manifest();
	let identifier = "my_random_test_identifier_123";
	let taskName = "my_random_test_task_name_123"
	let fileName = 'content_question_qti2_graphicgapmatch_' + identifier + '.xml';

	add_manifest_data(x, identifier, taskName)

	let manifestTag = x.getElementsByTagName('manifest')[0];
	let resourcesTag = manifestTag.getElementsByTagName('resources')[0];
	let resourceTag = resourcesTag.getElementsByTagName('resource')[0];

	//Name
	let metadata = resourceTag.getElementsByTagName('metadata')[0];
	let lom = metadata.getElementsByTagName('imsmd:lom')[0];
	let general = lom.getElementsByTagName('imsmd:general')[0];
	let title = general.getElementsByTagName('imsmd:title')[0];
	let langstring = title.getElementsByTagName('imsmd:langstring')[0];

	//Test if taskName is correctly set
	let test1 = (langstring.firstChild.nodeValue === taskName)

	//Test to see if identifier is correctly set
	let test2 = (resourceTag.getAttribute('identifier') === 'ID_' + identifier);
	let test3 = (resourceTag.getAttribute('href') === fileName);

	let fileTag = resourceTag.getElementsByTagName('file')[0];
	let test4 = (fileTag.getAttribute('href') === fileName)

	return test1 && test2 && test3 && test4;
}


function test_add_manifest_data_list() {

	let y = read_manifest();
	let identifierList = ["task_identifier1", "task_identifier2", "task_identifier3"];
	let taskNameList = ["task_name1", "task_name2", "task_name3"];

	add_manifest_data(y, identifierList, taskNameList)

	let manifestTag = y.getElementsByTagName('manifest')[0];
	let resourcesTag = manifestTag.getElementsByTagName('resources')[0];

	let testAnswers = [];

	for (let i = 0; i < identifierList.length; i++) {
		let resourceTag = resourcesTag.getElementsByTagName('resource')[i];

		//Name
		let metadata = resourceTag.getElementsByTagName('metadata')[0];
		let lom = metadata.getElementsByTagName('imsmd:lom')[0];
		let general = lom.getElementsByTagName('imsmd:general')[0];
		let title = general.getElementsByTagName('imsmd:title')[0];
		let langstring = title.getElementsByTagName('imsmd:langstring')[0];

		//Test if taskName is correctly set
		testAnswers.push(langstring.firstChild.nodeValue === taskNameList[i]);

		//Test to see if identifier is correctly set
		testAnswers.push(resourceTag.getAttribute('identifier') === 'ID_' + identifierList[i]);
		testAnswers.push(resourceTag.getAttribute('href').includes(identifierList[i]));

		let fileTag = resourceTag.getElementsByTagName('file')[0];
		testAnswers.push(fileTag.getAttribute('href').includes(identifierList[i]))

	}
	let allTrue = true;
	for (let i = 0; i < testAnswers.length; i++) {
		if (testAnswers[i] === false) {
			allTrue = false;
		}
	}
	return allTrue;
}

function test_add_language_to_all_tags() {
	var element = document.createElement("test");
	var child = document.createElement("child");
	element.appendChild(child);
	addLanguageToAllTags(element, "no_no");

	let test1 = element.lastChild.getAttribute('lang').includes("no_no");
	let test2 = element.lastChild.getAttribute('style').includes("display: none;");

	return test1 && test2;
}

function test_add_metadata(){
	let myDoc = read_xml();
	let identifier = "my_random_test_identifier_123";
	let taskTitle = "my_random_task_title_123";
	let parsons2D = false;
	let canvasHeight = 123;
	let title_no = "<div>norsk</div>";
	let title_ny = "<div>nynorsk</div>";
	let title_en = "<div>english</div>";

	add_metadata(myDoc, identifier, taskTitle, parsons2D, canvasHeight, title_no, title_ny, title_en);

	let ai = myDoc.getElementsByTagName('assessmentItem');
	let assessmentItem = ai[0];

	let test1 = (assessmentItem.getAttribute('identifier') === identifier)
	let test2 = (assessmentItem.getAttribute('title') === taskTitle)

	let itemBody = assessmentItem.getElementsByTagName('itemBody')[0];
	let test3 = (itemBody.getAttribute('inspera:defaultLanguage') === "no_no")
	let test4 = (itemBody.getAttribute('inspera:supportedLanguages') === "no_no,en_us,no_no_ny")

	let title = itemBody.getElementsByTagName("p");
	let test5 = title[0].innerHTML === '<div xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1">norsk</div>';

	let graphicGapMatchInteraction = assessmentItem.getElementsByTagName('graphicGapMatchInteraction')[0];
	let test6 = graphicGapMatchInteraction.getAttribute('inspera:canvasHeight')===canvasHeight.toString();
	let test7 = graphicGapMatchInteraction.getAttribute('class').includes("freeplacing markHotspots");

	return test1 && test2 && test3 && test4 && test5 && test6 && test7;
}

function test_add_empty_hotspot(){
	let myDoc = read_xml();
	let hotspotX = 123;
	let hotspotY = 10;
	let hotspotWidth = 50;
	let hotspotHeight = 51;
	let hotspotCoords = hotspotX.toString() + "," + hotspotY.toString() + "," + (hotspotX + hotspotWidth).toString() + "," + (hotspotY + hotspotHeight).toString();

	add_empty_hotspot(myDoc, hotspotX, hotspotY, hotspotWidth, hotspotHeight);

	let assessmentItem = myDoc.getElementsByTagName('assessmentItem');
	let graphicGapMatchInteraction = assessmentItem[0].getElementsByTagName('graphicGapMatchInteraction')[0];

	let associableHotspot = graphicGapMatchInteraction.getElementsByTagName("associableHotspot")[0];
	let test1 = associableHotspot.getAttribute('coords')===hotspotCoords;
	let test2 = associableHotspot.getAttribute('hotspotLabel')==="1";
	let test3 = associableHotspot.getAttribute('shape')==="rect";
	let test4 = associableHotspot.getAttribute('matchMax')==="0";

	return test1 && test2 && test3 && test4; 
}

function test_add_draggable_pair(){
	let myDoc = read_xml();
	let textInBox = "my random text 123";
	let boxX1 = 10;
	let boxY1 = 10;
	let boxWidth = 1; //Remember this is calculated by the function
	let boxHeight = 30;
	let hotspotX = 15;
	let hotspotY = 16;
	let hotspotWidth = 50;
	let hotspotHeight = 51;

	let hotspotCoords = hotspotX.toString() + "," + hotspotY.toString() + "," + (hotspotX + hotspotWidth).toString() + "," + (hotspotY + hotspotHeight).toString();

	add_draggable_pair(myDoc, textInBox, boxX1, boxY1, boxWidth, boxHeight, hotspotX, hotspotY, hotspotWidth, hotspotHeight);

	let assessmentItem = myDoc.getElementsByTagName('assessmentItem');
	let graphicGapMatchInteraction = assessmentItem[0].getElementsByTagName('graphicGapMatchInteraction')[0];

	let gi = graphicGapMatchInteraction.getElementsByTagName('gapImg')[0];
	let obj = gi.getElementsByTagName('object')[0];

	let test1 = obj.getAttribute('x')===boxX1.toString();
	let test2 = obj.getAttribute('y')===boxY1.toString();
	let test3 = obj.getAttribute('height')===boxHeight.toString();

	let div = obj.getElementsByTagName('div')[0];

	let test4 = div.getAttribute('inspera:label-lang-en_us')===textInBox;
	let test5 = div.getAttribute('inspera:label-lang-no_no_ny')===textInBox;

	let associableHotspot = graphicGapMatchInteraction.getElementsByTagName('associableHotspot')[0];

	let test6 = associableHotspot.getAttribute('coords')===hotspotCoords;
	let test7 = associableHotspot.getAttribute('hotspotLabel')==="1";
	let test8 = associableHotspot.getAttribute('shape')==="rect";
	let test9 = associableHotspot.getAttribute('matchMax')==="0";

	return test1 && test2 && test3 && test4 && test5 && test6 && test7 && test8 && test9; 

}

function test_connect_drag_area_to_drop_area(){
	let myDoc = read_xml();
	let newGapImgName="my_new_gap_img_123";
	let newAssociableHotspotName="my_new_associalbe_hotspot_name_123";
	let newGA = newGapImgName + " " + newAssociableHotspotName;

	connectDragAreaToDropArea(myDoc, newGapImgName, newAssociableHotspotName);

	let assessmentItem = myDoc.getElementsByTagName('assessmentItem');
	let responseDeclarations = assessmentItem[0].getElementsByTagName('responseDeclaration');

	//Add value to correctResponses
	let correctResponses = responseDeclarations[0].getElementsByTagName('correctResponse');
	let correctResponse = correctResponses[0].getElementsByTagName('value')[0];

	let test1 = correctResponse.innerHTML === newGA;

	let mapping = responseDeclarations[0].getElementsByTagName('mapping');
	let mapEntry = mapping[0].getElementsByTagName('mapEntry')[0];

	let test2 = mapEntry.getAttribute('mapKey')===newGA;
	let test3 = mapEntry.getAttribute('mappedValue')==="1";

	let responseProcessing = assessmentItem[0].getElementsByTagName('responseProcessing')[0];
	let responseConditions = responseProcessing.getElementsByTagName('responseCondition');

	let responseElseIfs = responseConditions[1].getElementsByTagName('responseElseIf');
	//ResponseElseIf 1
	let andResponse = responseElseIfs[0].getElementsByTagName('and')[0];
	let member = andResponse.getElementsByTagName('member')[0];
	let baseValue = member.getElementsByTagName('baseValue')[0];

	let test4 = baseValue.innerHTML===newGA;
	let test5 = baseValue.getAttribute('baseType')==="directedPair";

	let orResponse = responseElseIfs[1].getElementsByTagName('or')[0];
	member = orResponse.getElementsByTagName('member')[0];
	baseValue = member.getElementsByTagName('baseValue')[0];

	let test6 = baseValue.innerHTML===newGA;
	let test7 = baseValue.getAttribute('baseType')==="directedPair";

	return test1 && test2 && test3 && test4 && test5 && test6 && test7;
}

function test_add_distractor(){
	let myDoc = read_xml();
	let textInBox = "my random text 123";
	let boxX1 = 10;
	let boxY1 = 10;
	let boxWidth = 1; //Remember this is calculated by the function
	let boxHeight = 30;


	add_distractor(myDoc, textInBox, boxX1, boxY1, boxWidth, boxHeight);

	let assessmentItem = myDoc.getElementsByTagName('assessmentItem');

	//response declaration nr 0 is left empty since we have to add a new one for a distractor
	let rd = assessmentItem[0].getElementsByTagName('responseDeclaration')[1];

	let test1 = rd.getAttribute('baseType')==='point';
	let test2 = rd.getAttribute('cardinality')==='single';
	let test3 = rd.getAttribute('identifier').includes('gapImg');

	let graphicGapMatchInteraction = assessmentItem[0].getElementsByTagName('graphicGapMatchInteraction')[0];
	let gi = graphicGapMatchInteraction.getElementsByTagName('gapImg')[0];
	let obj = gi.getElementsByTagName('object')[0];

	let test4 = obj.getAttribute('x')===boxX1.toString();
	let test5 = obj.getAttribute('y')===boxY1.toString();
	let test6 = obj.getAttribute('height')===boxHeight.toString();

	let div = obj.getElementsByTagName('div')[0];

	let test7 = div.getAttribute('class')==="text";
	let test8 = div.getAttribute('inspera:label-lang-en_us')===textInBox;
	let test9 = div.getAttribute('inspera:label-lang-no_no_ny')===textInBox;

	let p = div.getElementsByTagName('p')[0];

	let test10 = p.innerHTML === textInBox;


	return test1 && test2 && test3 && test4 && test5 && test6 && test7 && test8 && test9 && test10; 
}

function test_get_text_width(){
	let text = "This is my random text 123";
	let font = "14px Arial, sans-serif";

	let expectedWidth=168.0615234375;

	return parseInt(getTextWidth(text,font).toString())===parseInt(expectedWidth.toString());
}

function test_get_length_of_word(){
	let text = "This is my random text 123";
	let expectedWidth=parseInt((168.0615234375+14).toString());

	return parseInt(get_length_of_word(text).toString())===expectedWidth;
}

function test_generate_start_options(){
	let lines = ["hello","this","is","a longer sting to test and see if the new line will go to the next one"];
	let height = 50;
	let distractors = ["one", "distractor"];
	let startOptions = generateStartOptions(lines, height, distractors);

	let allTestsPass = true;
	for (var key in startOptions) {
		if (startOptions.hasOwnProperty(key)) {
			if(startOptions[key].length!=2){
				allTestsPass = false;
			}
			if(!(startOptions[key][1]===420 || startOptions[key][1]===490)){
				allTestsPass = false;
			}
		}
	}

	return allTestsPass;
}

function test_add_child_with_value(){
	let myDoc = read_xml();
	let assessmentItem = myDoc.getElementsByTagName('assessmentItem')[0];

	let childName = "newChild123";
	let newValue = "newValue123";

	addChildWithValue(myDoc, assessmentItem, childName, newValue);

	let a = assessmentItem.getElementsByTagName(childName)[0];
	let test1 = a.innerHTML===newValue;

	return test1;
}

function test_add_child_with_attribute(){
	let myDoc = read_xml();
	let assessmentItem = myDoc.getElementsByTagName('assessmentItem')[0];

	var newElement = "newElement123";
	var newAttribute = "newAttribute123";
	var newValue = "newValue123";
	addChildWithAttribute(myDoc ,assessmentItem,newElement, newAttribute, newValue);

	let a = assessmentItem.getElementsByTagName(newElement)[0];
	let test1 = a.getAttribute(newAttribute)===newValue;

	return test1;
}

function test_add_attribute(){
	var element = document.createElement("test");
	let attributeName = "newAttribute123";
	var newValue = "newValue123";
	addAttribute(element, attributeName, newValue);

	let test1 = element.getAttribute(attributeName)===newValue;

	return test1;

}