var PopulatecalculatorData = {

    WCFServiceUrl: "",

    Init: function (ContentHolder) {
        //NOT IMPLEMENTED FOR CALCULATOR
        $('#calcResults').focus(function () { SetEnd(); });
    }
};
function SetEnd() {
    var txt = document.getElementById("calcResults");
    if (txt.createTextRange) {
        //IE  
        var FieldRange = txt.createTextRange();
        FieldRange.moveStart('character', txt.value.length);
        FieldRange.collapse();
        FieldRange.select();
    }
    else {
        //Firefox and Opera  
        txt.focus();
        var length = txt.value.length;
        txt.setSelectionRange(length, length);
    }
}
var nonDigits = ["x", "/", "*", "+", "-", "=", "c", "."];
function Calculator_OnClick(keyStr) {
    var resultsField = document.getElementById("calcResults");

    // To continue, the textbox must be less than 11 characters 
    // OR the keyStr be a operator 
    // OR the last keyStr be an operator
    if (resultsField.value.length < 10 || jQuery.inArray(keyStr, nonDigits) >= 0 || this.lastOp == "1") {
        resultsField.focus();
        var concat = true;
        switch (keyStr) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case ".":
                if ((this.lastOp == this.opClear) || (this.lastOp == this.opOperator)) {
                    resultsField.value = keyStr;
                } else {
                    if ((keyStr != ".") || (resultsField.value.indexOf(".") < 0)) {
                        resultsField.value += keyStr;
                    }
                }
                this.lastOp = this.opNumber;
                break;
            case "x":
            case "/":
            case "*":
            case "+":
            case "-":
                if (this.lastOp == this.opNumber)
                    this.Calc();
                //Check to see if last val operator
                if (this.evalStr != "") {
                    var lastDigit = this.evalStr.substring(this.evalStr.length - 1, this.evalStr.length);
                    if ((lastDigit == "x") || (lastDigit == "/") || (lastDigit == "*") || (lastDigit == "-") || (lastDigit == "+")) {
                        //Last digit operator remove it
                        this.evalStr = this.evalStr.substring(0, this.evalStr.length - 1);
                        this.evalStr += keyStr;
                        concat = false;
                    }
                }
                if (concat == true) {
                    this.evalStr += resultsField.value + keyStr;
                }
                this.lastOp = this.opOperator;
                break;
            case "=":
                this.Calc();
                this.lastOp = this.opClear;
                break;
            case "c":
                resultsField.value = "0";
                this.lastOp = this.opClear;
                this.evalStr = "";
                break;
        }
    }
}

function Calculator_Calc() {
    var resultsField = document.getElementById("calcResults");
    resultsField.value = eval(this.evalStr + resultsField.value);
    this.evalStr = "";
}
function Calculator() {
    this.evalStr = "";
    this.opNumber = 0;
    this.opOperator = 1;
    this.opClear = 2;
    this.lastOp = this.opClear;
    this.OnClick = Calculator_OnClick;
    this.Calc = Calculator_Calc;
}
gCalculator = new Calculator();
function onlyNumbers(evt) {
    var e = event || evt;
    var charCode = e.which || e.keyCode;
    var character = String.fromCharCode(e.keyCode);
    if ((charCode == 13) && (character == String.fromCharCode(13))) {
        character = "=";
    }

    if ($.inArray(character, nonDigits) > -1) {
        SetEnd();
        gCalculator.OnClick(character);
        return false;
    }
    else {
        if (!(charCode > 31 && (charCode < 48 || charCode > 57))) {
            SetEnd();
            gCalculator.OnClick(character);
        }
        return false;
    }
}


function PopulatecalculatorData() {
}