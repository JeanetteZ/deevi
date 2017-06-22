
// Services
// This class contains all the legal services suggestions e.g. for female victims
var ServiceSuggestions = (function() {
  var female_services = "Women’s Legal Services NSW has a number of advice lines: <br> - Women’s Legal Contact Line: (02) 8745 6999 or 1800 801 501 <br> - Domestic Violence Legal Advice Line: (02) 8745 6999 or 1800 810 784";
  var male_services = "There are a number of services which cater to men: <br> - the 24/7 Mensline (1300 78 99 78) gives information and advice to men who are afraid to leave a violent relationship and have nowhere to go. <br> - the No To Violence Men’s Referral Service (1300 766 491) provides telephone counselling and referrals to men experiencing family violence";
  var lgbti_services = "A number of LGBTI services provide free calls, counselling and referrals: <br> - ACON (1800 063 060) <br> - QLIFE (1800 184 527)  <br> - Another Closet (1800 65 64 63) <br> - The Gender Centre Inc (02 9569 2366) <br> - Twenty10 (02 8594 9555) or rural free call 1800 65 2010 for specialised LGBTI service for young people aged 12 to 26";
  var indigenous_services = "For indigenous victims, see <br> - Indigenous Women’s Legal Contact Line (02 8745 6977 or 1800 639 784) <br> - National Family Violence Prevention Legal Services(03 9244 3333) <br> - Aboriginal Medical Services";
  var immigrant_services = "As an immigrant/refugee victims, you can contact the Immigrant Women’s Speakout Association of NSW (02 9635 8022)";
  var disability_services = "For disability related services, see Penrith’s Looking After Me program";
  
  return {
    makeServiceSuggestions: makeServiceSuggestions
  };
  
  // when the Services dialogue node in Watson is hit (i.e. if watson message is "suggestServices"
  // then extract all context variables
  // and suggest appropriate legal services according to the context variables
  function makeServiceSuggestions(payload){
    if (payload.output && payload.output.text=="suggestServices") {
      var context = payload.context;
      if (context.gender=="female"){
          payload.output.text = female_services;
      } else if (context.gender=="male"){
          payload.output.text = male_services;
      }

      if(context.lgbti=="yes" | "unsure"){
        payload.output.text += "<br/><br/>" + lgbti_services;
      }
      if(context.indigenous=="yes"){
        payload.output.text += "<br/><br/>" + indigenous_services;
      }
      if(context.immigrant=="yes"){
        payload.output.text += "<br/><br/>" + immigrant_services;
      }
      if(context.disability=="yes"){
        payload.output.text += "<br/><br/>" + disability_services;
      }
    }
  }
}());