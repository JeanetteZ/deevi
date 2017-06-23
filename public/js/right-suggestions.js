//Rights -  by JZ
//This class contains legal definitions of domestic violence
//So as to help victims understand their rights
var RightSuggestions = (function() {
  var poffense_rights = "physical abuses such as: <br /> \
  - direct assault on the body (choking, shaking, eye injuries, biting, slapping, pushing, spitting, burning, punching, or kicking) <br/>\
  - use of weapons including objects <br />\
  - assaulting the children <br />\
  - locking the victim in or out of the house or rooms <br/>\
  - forcing the victim to take drugs, withholding medication <br/>\
  - food or medical care and <br/>\
  - sleep deprivation <br/>";
  var soffense_rights = "sexual abuses such as: <br/>\
  - any form of pressured/unwanted sex, with or without protection against pregnancy/sexually transmitted disease <br/>\
  - causing pain during sex/assaulting genitals <br/>\
  - making the victim perform sexual acts unwillingly (including taking or distributing explicit photos without their consent) and <br/>\
  - criticising or using sexually degrading insults <br/>";
  var voffense_rights = "verbal abuses such as: <br/>\
  - swearing and continual humiliation <br/>\
  - attacks on intelligence, sexuality, body image and capacity as a parent and spouse <br/>\
  ... whether in private or public <br/>"
  //TODO: stalking/harassment, financial abuse offenses - see Google Doc

  return {
    makeRightSuggestions: makeRightSuggestions
  };
  
  // when the Rights dialogue node in Watson is hit (i.e. if watson message is "suggestRights"
  // then check which type of domestic violence the user experiences
  // and suggest appropriate legal rights accordingly


  //TODO for future: check to see which variable is missing
  //e.g. if no perpetrator provided, ask the user: "what's the relationship between you and the person that did that to you?"
  //e.g. if only generic abuse provided, ask the user: "can you tell me more about what your $perpetrator did to you?"
  function makeRightSuggestions(payload){
    if (payload.output && payload.output.text=="suggestRights") {
      var context = payload.context;
      var offenses=[];
      var suggestions="";

      if (context.poffense!=null){
      	  offenses.push("physical abuse");
          suggestions += "<br/>" + poffense_rights;
      } 
	  if (context.soffense!=null){
	  	  offenses.push("sexual abuse");
          suggestions += "<br/>" + soffense_rights;
      } 
	  if (context.voffense!=null){
	  	  offenses.push("verbal abuse");
          suggestions += "<br/>" + voffense_rights;
      } 

      //Ugly code - needs rewriting
      payload.output.text= "What your " +context.perpetrator+" did to you may amount to domestic violence. In particular: ";
      if (offenses.length==1){
      	payload.output.text+=offenses[0]+".<br/><br/>";
      } else if (offenses.length>1){
      	var i;
      	for (i=0; i<offenses.length-1;i++){
      	payload.output.text+=offenses[i]+", ";
      } payload.output.text+=" and "+offenses[i]+".<br/><br/>";
      } else { //no offenses caught e.g. offense is general offense
      	payload.output.text=""; //TODO prompt user for more details about offense
      }
      
      payload.output.text+= "According to the law, domestic violence includes:"+suggestions;
	    Api.sendRequest("", context); // Finally, send "anything_else" to Watson to get the catch-all reply
      //TODO Hide anything_else message from user
    }
  }
}());