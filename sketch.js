// Word Counting
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/040.1-wordcounts-p5.html

let txt;
let img;
let counts = {};
let review,reviews;
let reviewTxt=[];
let ignore = ['a','is','of'];
let tokens;
let concordance = {};
let counter = 0;
let adj=[]
let noun=[]
let verb=[]
let pronoun=[]
let minV;
let newP;
let isSetUp=false;

function preload() {
    reviews = loadJSON('data/AMAZON_FASHION_5.json');
    img=loadImage('assets/profile.png')
}


function setup() {
  createCanvas(1000, 1000);

  for(review in reviews){
     reviewTxt.push(reviews[review].reviewText);
  }
  let reviewTextString=JSON.stringify(reviewTxt);
  
  let verbsArray=nlp(reviewTextString).verbs().out('array');
  for(verbKey in verbsArray )
  verb.push(verbsArray[verbKey])

  let nounsArray=nlp(reviewTextString).nouns().out('array');
  for(nounKey in nounsArray )
  noun.push(nounsArray[nounKey])

  let adjsArray=nlp(reviewTextString).nouns().adjectives().out('array');
  for(adjKey in adjsArray )
  adj.push(adjsArray[adjKey])

  let pronounsArray=nlp(reviewTextString).pronouns().out('array');
  for(pronounKey in pronounsArray )
  pronoun.push(pronounsArray[pronounKey])
  
  let myDictionary = [verb.length,adj.length,noun.length];
  minV=min(myDictionary);

  newP=wordCount(pronoun);

  image(img, 20, 25,35,35);
  let randomNum=Math.floor(Math.random() * minV);
  name=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  textStyle(NORMAL);
  text(name,75,50);
  textStyle(BOLD);
  text(newP[Math.floor(Math.random() * 4)]+" "+verb[randomNum]+" "+adj[randomNum]+" "+noun[randomNum],75,100);
  isSetUp=true;
}

function wordCount(reviewTxt) {
  let allreviews=reviewTxt.join(" ");
  let keys=[];
  console.log(allreviews);

   tokens = allreviews.split(/\W+/);

   for (let i = 0; i < tokens.length; i++) {
    let word = tokens[i].toLowerCase();
    if (!/\d+/.test(word)) {
      if (counts[word] === undefined) {
        counts[word] = 1;
        keys.push(word);
      } else {
        counts[word] = counts[word] + 1;
      }
    }
  }

  keys.sort(compare);

  function compare(a, b) {
    var countA = counts[a];
    var countB = counts[b];
    return countB - countA;
  }

  return keys
}

function mousePressed(){
  if(isSetUp){
    background(255);
    image(img, 20, 25,35,35);
    let randomNum=Math.floor(Math.random() * minV);
    name=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    textStyle(NORMAL);
    text(name,75,50);
    textStyle(BOLD);
    text(newP[Math.floor(Math.random() * 4)]+" "+verb[randomNum]+" "+adj[randomNum]+" "+noun[randomNum],75,100);
  }
}