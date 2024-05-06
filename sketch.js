// credits: p5js & gui libary

// UI related
let gui;    //established GUI
let randomizerButton; 
let uiPadding = 20

let textMode = "START"
let userLetterInput = "TYPEFACE MIXER"

// font randomization
let fontLoadList = [];                                        // get font list to preload all fonts                       
let fontList = ['Bagnard.otf', 'Junicode-Italic.ttf','CooperHewitt-Heavy.otf', 'LibreBaskerville-Regular.otf','EBGaramond12-Italic.otf', 'OfficeCodePro-Light.otf','Imbue10pt-Regular.ttf', 'OstrichSans-Heavy.otf']           
// use nodeJS if you want to have text be selected from folder ^ 
let randomFonts = [];                                         //this will select from the list preoloaded fonts from the fontLoadList variable

// typeorgraphy 
letter_size = 50 //size for modified letter

class myButton {
  constructor() {
    this.hover = false
    this.clicked = false
    this.outsideClick = false
  }
  show(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width
    this.h = height
    // rect(this.x,this.y, this.w, this.h)
  }
  check(mouseX, mouseY) {
    this.mouseX = mouseX
    this.mouseY = mouseY
    if (this.mouseX > this.x && this.mouseX < this.x + this.w && this.mouseY > this.y && this.mouseY < this.y + this.h) {
      this.hover = true
    }
    else {
      this.hover = false
    }
  }
}

function preload() {
  // goes through the list of fonts and loads them into fontLoadList. So the fonts get loaded onto an array to randomly to chose from
  for (let i = 0; i < fontList.length; i++) {
    fontLoadList[i] = loadFont('fonts/' + fontList[i]) 
  }
}

function setup() {
  // setup canvas
  createCanvas(1000, 600);

  // gui setup
  gui = createGui();
  gui.loadStyle("customStyle")
  gui.updateStyle();

  // UI objects
  editTextButton = new myButton(0, 0, 50, 50)
  
  randomizerButton = createButton("Randomizer", 50, 50, 170, 80);
  // moving the button x and y based on the width and height of the button that was established and the padding
  randomizerButton.x = width - randomizerButton.w - uiPadding 
  randomizerButton.y = height - randomizerButton.h - uiPadding

  kerningSlider = createSliderV("Kerning", 0, 0, 30, height / 2, 0 + letter_size, width/2 + letter_size)
  // moving the button x and y based on the width and height of the button that was established and the padding
  // kerningSlider.val = width / 2
  kerningSlider.x = width - kerningSlider.w - uiPadding
  kerningSlider.y = uiPadding
}

function draw() {
  background(245);
  drawGui();
  topSecreteInfo();

  if (textMode == "START") {
    mainBasicText()
  }

  if (textMode == "EDIT"){
    mainBasicText()
    textCursor()
  }
  
  if (textMode == "DEFAULT"){
    mainBasicText()
  }

  if (randomizerButton.isPressed) {
    textMode = "RANDOMIZED";
    for (let i = 0; i < userLetterInput.length; i += 1) {
      randomFonts[i] = random(fontLoadList)
    }
  }
  if (textMode == "RANDOMIZED") {
    //For loop that goes through each letter in the userLetterInput string
    // stop for loop after button pressed
    for (let i = 0; i < userLetterInput.length; i += 1) {
      //maps the range of 0 to length of the sting in 0 to width for spacing the letter out 
      let tw = map(i, 0, userLetterInput.length - 1, 0 + kerningSlider.val - letter_size, width - kerningSlider.val + letter_size)
      push()
      textFont(randomFonts[i])
      text(userLetterInput[i], tw, height / 2)
      pop()
    }
  }
  // if (kerningSlider.isChanged) {
  //   print(kerningSlider.val)
  // }
}

function mousePressed(){
  if (editTextButton.hover == true){
    // print("yes")
    textMode = "EDIT"
    return
  }
  if (editTextButton.hover == false && textMode == "EDIT"){
    textMode = "DEFAULT"
  }
}

function topSecreteInfo(){
  push()
  textSize(13)
  textAlign(LEFT,TOP)
  text("— " + textMode + " MODE" + " —",uiPadding,uiPadding)
  pop()
}
// I will need to consider other buttons that one may used
function keyPressed() {
  if (key === "Backspace" && textMode == "EDIT") {
    // print(userLetterInput.slice(0, -1))
    userLetterInput = userLetterInput.slice(0, -1)
  }
}
function keyTyped() {
  if (keyCode != ENTER && textMode == "EDIT")
    userLetterInput += key
}

function textCursor() { 
  if (frameCount % 60 < 30) {
    push()
    strokeWeight(2)
    line(width / 2 + textWidth(userLetterInput) / 2, height / 2 - letter_size / 2, width / 2 + textWidth(userLetterInput) / 2, height / 2 + letter_size / 2)
    pop()
  }
}

function mainBasicText(){

  //highlight text when you hover over it
  if (textMode != "RANDOMIZED"){
    if (editTextButton.hover == true) {
      stroke(1)
      noFill()
    }
    if (editTextButton.hover == false) {
      fill(0)
    }
  }
  textAlign(CENTER, CENTER)
  textSize(letter_size)
  text(userLetterInput, width / 2, height / 2)


  
  //area to click for editing text
  editTextButton.show(width / 2 - textWidth(userLetterInput) / 2, height / 2 - letter_size / 2, textWidth(userLetterInput), letter_size)
  editTextButton.check(mouseX, mouseY)
  
}