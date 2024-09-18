

const exp = (function() {


    var p = {};


   /*
    *
    *   WHEEL SET UP
    *
    */

    let scoreTracker = 0; // track current score

    let spinsSpun = 1;  // track current number of spins (including spins for both wheels)

    let account = 'default'; //this is the account

    let usedVideos = new Set();

    let vidNumber = Math.floor(Math.random()*15);

    let spin_num = 20; //change this to the number of spins. This will change the number of spins AFTER the wheel decelerates. 


    // define each wedge
    const wedges = {
    one: {color:"#806b00", label:`<img src="./img/crazymemescrazyfights.jpeg"> @crazy memes\ncrazy fights`, shortName: "O1", description: `<li><img src="./img/crazymemescrazyfights.jpeg" alt="@crazy memes crazy fights" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@crazy memes crazy fights</strong> shows videos that make people mad.</li>`, example: `./example/crazymemescrazyfights.mp4`, descripExample: `<img src="./img/crazymemescrazyfights.jpeg" alt="@crazy memes crazy fights" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@crazy memes crazy fights</strong>`, emotion: "mad"},
    two: {color:"#b100fe", label:`<img src="./img/karenclips.jpeg"> @karen clips`, shortName: "O2", description: `<li><img src="./img/karenclips.jpeg" alt="@karen clips" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@karen clips</strong> shows videos that make people mad.</li>`, example: `./example/karenclips.mp4`, descripExample: `<img src="./img/karenclips.jpeg" alt="@karen clips" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@karen clips</strong>`, emotion: "mad"},
    three: {color:"#ffd800", label: `<img src="./img/yoda4ever.jpeg"> @yoda4ever`, shortName: "Af1", description: `<li><img src="./img/yoda4ever.jpeg" alt="@yoda4ever" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@yoda4ever</strong> shows videos that make people warm.</li>`, example: `./example/yoda4ever.mp4`, descripExample: `<img src="./img/yoda4ever.jpeg" alt="@yoda4ever" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"><strong>@yoda4ever</strong>`, emotion: "warm"},
    four: {color:"#800001", label:`<img src="./img/buitengebieden.jpeg"> @buitengebieden`, shortName: "Af2", description: `<li><img src="./img/buitengebieden.jpeg" alt="@buitengebieden" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@buitengebieden</strong> shows videos that make people warm.</li>`, example: `./example/buitengebieden.mp4`, descripExample: `<img src="./img/buitengebieden.jpeg" alt="@buitengebieden" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@buitengebieden</strong>`, emotion: "warm"},
    five: {color:"#fe6a00", label:`<img src="./img/wowterrifying.jpeg"> @wow terrifying`, shortName: "F1", description: `<li><img src="./img/wowterrifying.jpeg" alt="@wow terrifying" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@wow terrifying</strong> shows videos that make people scared.</li>`, example: `./example/wowterrifying.mp4`, descripExample:`<img src="./img/wowterrifying.jpeg" alt="@wow terrifying" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@wow terrifying</strong>`, emotion: "scared"},
    six: {color:"#007f0e", label:`<img src="./img/scaryclip.jpeg"> @scary clip`, shortName: "F2", description: `<li><img src="./img/scaryclip.jpeg" alt="@scary clip" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@scary clip</strong> shows videos that make people scared.</li>`, example: `./example/scaryclip.mp4`, descripExample: `<img src="./img/scaryclip.jpeg" alt="@scary clip" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@scary clip</strong>`, emotion: "scared"},
    seven: {color:"#fe0000", label:`<img src="./img/theworldoffunny.jpeg"> @the world\nof funny`, shortName: "Am1", description: `<li><img src="./img/theworldoffunny.jpeg" alt="@the world of funny" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@the world of funny</strong> shows videos that make people laugh.</li>`, example: `./example/theworldoffunny.mp4`, descripExample: `<img src="./img/theworldoffunny.jpeg" alt="@the world of funny" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@the world of funny</strong>`, emotion: "laugh"},
    eight: {color:"#0094fe", label:`<img src="./img/viralmemeguy2.jpeg"> @viral meme\nguy 2`, shortName: "Am2", description: `<li><img src="./img/viralmemeguy2.jpeg" alt="@viral meme guy 2" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@viral meme guy 2</strong> shows videos that make people laugh.</li>`, example: `./example/viralmemeguy.mp4`, descripExample: `<img src="./img/viralmemeguy2.jpeg" alt="@viral meme guy 2" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@viral meme guy 2</strong>`, emotion: "laugh"}
};

    // define each wheel

    const wheels = [

        //1-16
            {sectors: [ wedges.one, wedges.three, wedges.five, wedges.seven ], arrangement: "O1, Af1, F1, Am1", wheel: "0", MI: "high", img: `<img src="./img/0.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.one, wedges.three, wedges.five, wedges.eight ], arrangement: "O1, Af1, F1, Am2", wheel: "1", MI: "high", img: `<img src="./img/1.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.one, wedges.three, wedges.six, wedges.seven ], arrangement: "O1, Af1, F2, Am1", wheel: "2", MI: "high", img: `<img src="./img/2.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.one, wedges.three, wedges.six, wedges.eight], arrangement: "O1, Af1, F2, Am2", wheel: "3", MI: "high", img: `<img src="./img/3.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.one, wedges.four, wedges.five, wedges.seven ], arrangement: "O1, Af2, F1, Am1", wheel: "4", MI: "high", img: `<img src="./img/4.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.one, wedges.four, wedges.five, wedges.eight ], arrangement: "O1, Af2, F1, Am2", wheel: "5", MI: "high", img: `<img src="./img/5.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.one, wedges.four, wedges.six, wedges.seven ], arrangement: "O1, Af2, F2, Am1", wheel: "6", MI: "high", img: `<img src="./img/6.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.one, wedges.four, wedges.six, wedges.eight ], arrangement: "O1, Af2, F2, Am2", wheel: "7", MI: "high", img: `<img src="./img/7.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.two, wedges.three, wedges.five, wedges.seven ], arrangement: "O2, Af1, F1, Am1", wheel: "8", MI: "high", img: `<img src="./img/8.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.two, wedges.three, wedges.five, wedges.eight ], arrangement: "O2, Af1, F1, Am2", wheel: "9", MI: "high", img: `<img src="./img/9.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.two, wedges.three, wedges.six, wedges.seven ], arrangement: "O2, Af1, F2, Am1", wheel: "10", MI: "high", img: `<img src="./img/10.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.two, wedges.three, wedges.six, wedges.eight ], arrangement: "O2, Af1, F2, Am2", wheel: "11", MI: "high", img: `<img src="./img/11.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.two, wedges.four, wedges.five, wedges.seven ], arrangement: "O2, Af2, F1, Am1", wheel: "12", MI: "high", img: `<img src="./img/12.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.two, wedges.four, wedges.five, wedges.eight ], arrangement: "O2, Af2, F1, Am2", wheel: "13", MI: "high", img: `<img src="./img/13.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.two, wedges.four, wedges.six, wedges.seven ], arrangement: "O2, Af2, F2, Am1", wheel: "14", MI: "high", img: `<img src="./img/14.jpeg" style="width:40%; height:auto;">`},
            {sectors: [ wedges.two, wedges.four, wedges.six, wedges.eight ], arrangement: "O2, Af2, F2, Am2", wheel: "15", MI: "high", img: `<img src="./img/15.jpeg" style="width:40%; height:auto;">`},

        // F, F, Am, Am

            {sectors: [ wedges.five, wedges.six, wedges.seven, wedges.eight ], arrangement: "F1, F2, Am1, Am2", wheel: "16", MI: "low", img: `<img src="./img/16.jpeg" style="width:50%; height:auto;">`},

            // F, F, Aff, Aff
            {sectors: [ wedges.five, wedges.six, wedges.three, wedges.four ], arrangement: "F1, F2, Aff1, Aff2", wheel: "17", MI: "low", img: `<img src="./img/17.jpeg" style="width:50%; height:auto;">`},

            //O, O, Am, Am
            {sectors: [ wedges.one, wedges.two, wedges.seven, wedges.eight ], arrangement: "O1, O2, Am1, Am2", wheel: "18", MI: "low", img: `<img src="./img/18.jpeg" style="width:50%; height:auto;">`},

            //O, O, Aff, Aff

            {sectors: [ wedges.one, wedges.two, wedges.three, wedges.four ], arrangement: "O1, O2, Aff1, Aff2", wheel: "19", MI: "low", img: `<img src="./img/19.jpeg" style="width:50%; height:auto;">`},

];
    
    //fake accounts for attention check 
    const fake = {
        fake1: `<img src="./img/weirdlilguys.jpeg" alt="@weirdlilguys" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@weirdlilguys</strong>`,
        fake2: `<img src="./img/catswithjobs.jpeg" alt="@catswithjobs" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"> <strong>@catswithjobs</strong>`
};

    //allocate random wheel for each condition 
    const highMIwheel = [wheels[Math.floor(Math.random() * 16)]];// random integer from 0 - 15, for high MI wheel

    const lowMIwheel = [wheels[Math.floor(Math. random() * 4) + 16]]; // random integer from 16 - 19, for low MI wheel

    //wheel preloading
    function getVideoPaths(wheel) {
    const videos = [];
    wheel.sectors.forEach(sector => {
        for (let i = 0; i < 15; i++) {
            videos.push(`video/${sector.shortName}/${i}.mp4`);
        }
});
    return videos;
}

//getting descriptions with emotions for each account/wheel - Note: Not used in this experiment as this is pilot
function getDescriptions(wheel) {
    const descriptions = wheel.sectors.map(sector => sector.description);
    return descriptions; // Combine descriptions into an unordered list
}

//getting emotion for attention check - Note: Not used in this experiment as this is pilot
function getEmotion(wheel) {
    const emotion = wheel.sectors.map(sector => sector.emotion);
    return emotion; 
}

//getting preview wheel image
function getPreviewWheel(wheel) {
    return wheel.img;
}

//getting example videos
function getExamples(wheel) {
    const examples = wheel.sectors.map(sector => sector.example);
    return examples; 
}

//getting just account name and picture
function getdescripExample(wheel) {
    const descripExamples = wheel.sectors.map(sector => sector.descripExample);
    return descripExamples; 
}

//video paths for actual videos
    const highMIVideoPaths = getVideoPaths(highMIwheel[0]);
    const lowMIVideoPaths = getVideoPaths(lowMIwheel[0]);

//account names and picture
    const highMIDescripExamples = getdescripExample(highMIwheel[0]);
    const lowMIDescripExamples = getdescripExample(lowMIwheel[0]);

//preview wheels
    const highpreviewWheel = getPreviewWheel(highMIwheel[0]);
    const lowpreviewWheel = getPreviewWheel(lowMIwheel[0]);

//descriptions + examples for high - Note: Not used in this experiment as this is pilot
    const highMIDescription = getDescriptions(highMIwheel[0]);
    const highMIexamples = getExamples(highMIwheel[0]);

//descriptions + examples for low - Note: Not used in this experiment as this is pilot
    const lowMIDescription = getDescriptions(lowMIwheel[0]);
    const lowMIexamples = getExamples(lowMIwheel[0]);

//emotion labels for attention checks for high + low - Note: Not used in this experiment as this is pilot
    const highMIEmotion = getEmotion(highMIwheel[0]);
    const lowMIEmotion = getEmotion(lowMIwheel[0]);

//making sure that descriptions with emotions for each account/wheel preloads first even before preloading screen - Note: Not used in this experiment as this is pilot
 //   document.body.innerHTML += `<ul>${highMIDescription.join('')}</ul>`;
 //   document.body.innerHTML += `<ul>${lowMIDescription.join('')}</ul>`;


let usedVideoPaths = new Set();  // Track full video paths
const uniqueShortNames = {};

function generateUniqueVideoPath(shortName, max) {
    let newVidNumber;
    let videoPath;

    // Get a set for the current shortName if not present
    if (!uniqueShortNames[shortName]) {
        uniqueShortNames[shortName] = new Set();
    }

    // Check if all video paths for this shortName have been used
    if (uniqueShortNames[shortName].size === max) {
        uniqueShortNames[shortName].clear();  // Reset only for this shortName
    }

    do {
        // Generate a random video number between 0 and max-1
        newVidNumber = Math.floor(Math.random() * max);
        videoPath = `video/${shortName}/${newVidNumber}.mp4`;
    } while (uniqueShortNames[shortName].has(videoPath));  // Keep generating if path is used

    // Add the newly generated path to the set for this shortName
    uniqueShortNames[shortName].add(videoPath);
    
    return videoPath;
}

function getShortName(longName) {
    // Iterate over each key in the wedges object
        for (let key in wedges) {
        // Check if the label matches the longName
            if (wedges[key].label === longName) {
            // Return the corresponding shortName
            return wedges[key].shortName;
        }
    }
    // Return null or an appropriate value if no match is found
    return null;
}
    // trial: spinner
    const spin = {
        type: jsPsychCanvasButtonResponse,
        stimulus: function(c, spinnerData) {
            createSpinner(c, spinnerData, scoreTracker, jsPsych.timelineVariable('sectors'), spin_num); 
        },
        canvas_size: [500, 500],
        score: function() {
            return scoreTracker
        },
        post_trial_gap: 1000,
        data: {
            arrangement: jsPsych.timelineVariable('arrangement'), 
            wheel: jsPsych.timelineVariable('wheel'), 
            MI: jsPsych.timelineVariable('MI')
        },
        on_finish: function(data) {
            data.spinsSpun = spinsSpun;
            longName = (data.outcomes[0] || '').trim(); 
            shortName = getShortName(longName);
            videoPath = generateUniqueVideoPath(shortName, 15);  // Call the revised function
            data.videoPath = videoPath;
            console.log(data);
            spin_num--;
        }
    };

    const video_load = {
        type: jsPsychVideoKeyboardResponse,
        stimulus: function() {
            console.log(videoPath);
            return [videoPath]; 
        },
            width: 640,
            height: 480,
            trial_ends_after_video: true,
            response_ends_trial: false,
            on_finish: function(data) {
            spinsSpun++;
        }
    };

   /*
    *
    *   INSTRUCTIONS
    *
    */


    const html = {
        intro_preChk: [
            `<div class='parent'>
                <p><strong> Welcome to "Spin the Wheel"! </strong></p>
                <p>We're interested in your response and thoughts about a game of chance, where outcomes are random rather than controlled. </p>
                <p>Specifically, you'll play a game of chance called spin a wheel. </p> 
                <p>To add a fun twist, you'll watch a Twitter video after each spin. </p>
                <img src="./img/spin.gif" style="width:65%; height:auto;">
            </div>`,

            `<div class='parent'>
                <p>Each wheel has 4 different Twitter accounts. </p>
                <p>When you spin the wheel, you'll land on an account and watch a video posted by that account. </p> 
                <p>For example, if you land on <img src="./img/yoda4ever.jpeg" alt="@yoda4ever" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"><strong>@yoda4ever</strong>, you'll watch a video from <img src="./img/yoda4ever.jpeg" alt="@yoda4ever" style="vertical-align:middle; width:40px; height:40px; border-radius: 50%;"><strong>@yoda4ever</strong>'s feed.</p>
                <img src="./img/examplewheel.jpeg" style="width:40%; height:auto;">
            <div>`,

            `<div class='parent'>
                <p>You'll play 2 rounds of Spin the Wheel. </p>
                <p>For each round, you'll spin the wheel 20 times. </p> <p> After each round, you'll answer questions about your experience spinning the wheel. </p>
                <img src="./img/examplewheel.jpeg" style="width:40%; height:auto;">
            </div>`
        ],

        postTask: [
            `<div class='parent'>
                <p>Thank you!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ],

        intro_DescriptionsHigh: [
            `<div class='parent'>
                <p>${highpreviewWheel}</p>
                <p>Next, we will familiarize you with the kind of videos posted by each account. </p> 
                <p>Specifically, you'll watch a video posted by each account on the wheel.</p>
                <p>First, you'll watch an example video from ${highMIDescripExamples[0]}'s feed.</p>
                <p>Then, you'll watch an example video from ${highMIDescripExamples[1]}'s feed.</p>
                <p>Third, you'll watch an example video from ${highMIDescripExamples[2]}'s feed.</p>
                <p>Lastly, you'll watch an example video from ${highMIDescripExamples[3]}'s feed.</p>
                </div>
                <p>Starting on the next page, you'll watch the example videos of each of the accounts one-by-one. </p>
            </div>`
        ], 

        intro_DescriptionsLow_example0: [
            `<div class='parent'>
             <p>Below is a video from ${lowMIDescripExamples[0]}'s feed. </p>
             <p> Watch the video to get a sense of the type of content that ${lowMIDescripExamples[0]} posts. </p>
            <p>Please make sure your volume is turned on. </p>
            <video src= "${lowMIexamples[0]}" style="width:60%; height:60%;" controls>
                Your browser does not support the video tag.
            </video>
            </p>
        </div>`
        ],

        intro_DescriptionsLow_example1: [
            `<div class='parent'>
            <p>Below is a video from ${lowMIDescripExamples[1]}'s feed. </p>
             <p> Watch the video to get a sense of the type of content that ${lowMIDescripExamples[1]} posts. </p>
            <p>Please make sure your volume is turned on. </p>
            <video src= "${lowMIexamples[1]}" style="width:60%; height:60%;" controls>
                Your browser does not support the video tag.
            </video>
            </p>
        </div>`
        ],

        intro_DescriptionsLow_example2: [
            `<div class='parent'>
            <p>Below is a video from ${lowMIDescripExamples[2]}'s feed. </p>
             <p> Watch the video to get a sense of the type of content that ${lowMIDescripExamples[2]} posts. </p>
            <p>Please make sure your volume is turned on. </p>
            <video src= "${lowMIexamples[2]}" style="width:60%; height:60%;" controls>
                Your browser does not support the video tag.
            </video>
            </p>
        </div>`
        ],

        intro_DescriptionsLow_example3: [
            `<div class='parent'>
            <p>Below is a video from ${lowMIDescripExamples[3]}'s feed. </p>
             <p> Watch the video to get a sense of the type of content that ${lowMIDescripExamples[3]} posts. </p>            
             <p>Please make sure your volume is turned on. </p>
            <video src= "${lowMIexamples[3]}" style="width:60%; height:60%;" controls>
                Your browser does not support the video tag.
            </video>
            </p>
        </div>`
        ],

        intro_HighDescriptionsAfterExamples: [
            `<div class='parent'>
             <p>You're now ready to play Round 1!</p> 
             <p>Please make sure you're volume is on. </p> 
             <p> Just grab the wheel with your cursor and give it a spin!</p>
             <p> Click "Next" to continue. </p>
        </div>`
        ],

        intro_DescriptionsHigh_example0: [
            `<div class='parent'>
            <p>First is a video from ${highMIDescripExamples[0]}'s feed. </p>
             <p> Watch the video to get a sense of the type of content that ${highMIDescripExamples[0]} posts. </p>
            <p>Please make sure your volume is turned on. </p>
            </p>
        </div>`
        ],

        intro_DescriptionsHigh_example1: [
            `<div class='parent'>
            <p>Next is a video from ${highMIDescripExamples[1]}'s feed. </p>
             <p> Watch the video to get a sense of the type of content that ${highMIDescripExamples[1]} posts. </p>
            <p>Please make sure your volume is turned on. </p>
            </p>
        </div>`
        ],

        intro_DescriptionsHigh_example2: [
            `<div class='parent'>
            <p>Third is a video from ${highMIDescripExamples[2]}'s feed. </p>
             <p> Watch the video to get a sense of the type of content that ${highMIDescripExamples[2]} posts. </p>
            <p>Please make sure your volume is turned on. </p>
            </p>
        </div>`
        ],

        intro_DescriptionsHigh_example3: [
            `<div class='parent'>
            <p>Last is a video from ${highMIDescripExamples[3]}'s feed. </p>
             <p> Watch the video to get a sense of the type of content that ${highMIDescripExamples[3]} posts. </p>
            <p>Please make sure your volume is turned on. </p>
            </p>
        </div>`
        ],

        intro_toSecond: [
            `<div class='parent'>
                <p>You're now ready to play Round 2! </p>
                <p>Click "Next" to continue. </p>
            </div>`
        ],
    };


    function MakeIntro() {

        const correctAnswers = {
            attnChk0 : `True`, 
            attnChk1 : `True`, 
            attnChk2: `True`,
            attnChk3: `True`,
            attnChk4: `False`,
        };


        const errorMessage = {
            type: jsPsychInstructions,
            pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand Spin the Wheel, please re-read the instructions.</p></div>`],
            show_clickable_nav: true,
            allow_keys: false,
        };


        const attnChk = {
            type: jsPsychSurveyMultiChoice,
            preamble: `<div class='parent'>
               <p> For Round 1, you'll be spinning this wheel:</p> 
                <p>${highpreviewWheel}</p>
                <p> Before you continue, please answer the following questions: </p>
                </div>`,
            questions: [
                {
                    prompt: `${highMIDescripExamples[0]} is an account on the wheel.`, 
                    name: `attnChk0`, 
                    options: [`True`, `False`],
                },
                {
                    prompt: `${highMIDescripExamples[1]} is an account on the wheel.`, 
                    name: `attnChk1`, 
                    options: [`True`, `False`],
                },
                {
                    prompt: `${highMIDescripExamples[2]} is an account on the wheel.`, 
                    name: `attnChk2`, 
                    options: [`True`, `False`],
                },
                {
                    prompt: `${highMIDescripExamples[3]} is an account on the wheel.`, 
                    name: `attnChk3`, 
                    options: [`True`, `False`],
                },
                {
                    prompt: `${fake.fake1} is an account on the wheel.`, 
                    name: `attnChk4`, 
                    options: [`True`, `False`],
                },
            ],
            randomize_question_order: true,
            scale_width: 500,
            on_finish: (data) => {
                  const totalErrors = getTotalErrors(data.response, correctAnswers);
                  data.totalErrors = totalErrors;
            },
        };

        function getTotalErrors(response, correctAnswers) {
            let errorCount = 0;

            // Compare each response with correct answers
            for (const key in correctAnswers) {
                if (response[key] !== correctAnswers[key]) {
                    errorCount++;
                }
            }
            return errorCount;
        }


        const conditionalNode = {
          timeline: [errorMessage],
          conditional_function: () => {
            const fail = jsPsych.data.get().last(1).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };

        const instLoop = {
          timeline: [attnChk, conditionalNode],
          loop_function: () => {
            const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };



        const introTimeline = {
            timeline: [instLoop],
        }

        this.timeline = [introTimeline];
    }

     function MakeIntroLow() {

    const correctAnswers_low = {
            attnChk_low0 : `True`, 
            attnChk_low1 : `True`, 
            attnChk_low2 : `True`, 
            attnChk_low3 : `True`,
            attnChk_low4 : `False`,  
        };


        const errorMessage_low = {
            type: jsPsychInstructions,
            pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand Spin the Wheel, please re-read the instructions.</p></div>`],
            show_clickable_nav: true,
            allow_keys: false,
        };



 const attnChk_low = {
            type: jsPsychSurveyMultiChoice,
             preamble: `<div class='parent'>
               <p> For Round 2, you'll be spinning this wheel:</p> 
                <p>${lowpreviewWheel}</p>
                <br>
                </div>`,
            questions: [
                {
                    prompt: `${lowMIDescripExamples[0]} is an account on the wheel.`, 
                    name: `attnChk_low0`, 
                    options: [`True`, `False`],
                },
                {
                    prompt: `${lowMIDescripExamples[1]} is an account on the wheel.`, 
                    name: `attnChk_low1`, 
                    options: [`True`, `False`],
                },
                {
                    prompt: `${lowMIDescripExamples[2]} is an account on the wheel.`, 
                    name: `attnChk_low2`, 
                    options: [`True`, `False`],
                },
                {
                    prompt: `${lowMIDescripExamples[3]} is an account on the wheel.`, 
                    name: `attnChk_low3`, 
                    options: [`True`, `False`],
                },
                {
                    prompt: `${fake.fake2} is an account on the wheel.`, 
                    name: `attnChk_low4`, 
                    options: [`True`, `False`],
                },
            ],
            randomize_question_order: true,
            scale_width: 500,
            on_finish: (data) => {
                  const totalErrors = getTotalErrors(data.response, correctAnswers_low);
                  data.totalErrors = totalErrors;
            },
        };

        function getTotalErrors(response, correctAnswers_low) {
            let errorCount = 0;

            // Compare each response with correct answers
            for (const key in correctAnswers_low) {
                if (response[key] !== correctAnswers_low[key]) {
                    errorCount++;
                }
            }
            return errorCount;
        }


        const conditionalNode_low = {
          timeline: [errorMessage_low],
          conditional_function: () => {
            const fail = jsPsych.data.get().last(1).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };

        const instLoop_low = {
          timeline: [attnChk_low, conditionalNode_low],
          loop_function: () => {
            const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };



        const introTimeline_low = {
            timeline: [instLoop_low],
        }

        this.timeline = [introTimeline_low];
    }

    p.consent = {
        type: jsPsychExternalHtml,
        url: "./html/consent.html",
        cont_btn: "advance",
    };

    p.intro = new MakeIntro();

    p.intro_toSecondChk = new MakeIntroLow();

    p.intro_preChk = {
            type: jsPsychInstructions,
            pages: html.intro_preChk,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };


    p.intro_DescriptionsHigh = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsHigh,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

    p.intro_DescriptionsHigh_example0 = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsHigh_example0,
            show_clickable_nav: true,
            post_trial_gap: 500,
        }; 

    p.intro_DescriptionsHigh_example1 = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsHigh_example1,
            show_clickable_nav: true,
            post_trial_gap: 500,
        }; 

    p.intro_DescriptionsHigh_example2 = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsHigh_example2,
            show_clickable_nav: true,
            post_trial_gap: 500,
        }; 

    p.intro_DescriptionsHigh_example3 = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsHigh_example3,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };     

    p.intro_HighDescriptionsAfterExamples = {
            type: jsPsychInstructions,
            pages: html.intro_HighDescriptionsAfterExamples,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };   


    p.intro_DescriptionsLow_example0 = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsLow_example0,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };    


    p.intro_DescriptionsLow_example1 = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsLow_example1,
            show_clickable_nav: true,
            post_trial_gap: 500,
        }; 

    p.intro_DescriptionsLow_example2 = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsLow_example2,
            show_clickable_nav: true,
            post_trial_gap: 500,
        }; 

    p.intro_DescriptionsLow_example3 = {
            type: jsPsychInstructions,
            pages: html.intro_DescriptionsLow_example3,
            show_clickable_nav: true,
            post_trial_gap: 500,
        }; 
  

    p.intro_toSecond = {
            type: jsPsychInstructions,
            pages: html.intro_toSecond,
            show_clickable_nav: true,
            post_trial_gap: 500,
        }; 

       
    const FlowScale = ['0<br>Not at all', '1<br>', '2<br>', '3<br>', '4<br>', '5<br>', '6<br>', '7<br>','8<br>Extremely'];
    
    p.flowMeasure1 = {
        type: jsPsychSurveyLikert,
        preamble: 
        `<div style='padding-top: 50px; width: 900px; font-size:16px'> 
            <p>How immersed and engaged did you feel during Round 1 of Spin the Wheel? </p>
            <p>To report how immersed and engaged you felt, please answer the following questions.</p>
        </div>`,
        questions: [
        {
            prompt: `How immersive was Round 1 of Spin the Wheel?`,
            name: `flow_0high`,
            labels: FlowScale,
            required: true, 
        },
        {
            prompt: `How engaging was Round 1 of Spin the Wheel?`,
            name: `flow_1high`,
            labels: FlowScale,
            required: true,
        },
        {
            prompt: `How engrossing was Round 1 of Spin the Wheel?`,
            name: `flow_2high`,
            labels: FlowScale,
            required: true,
        },
        {
            prompt: `How boring was Round 1 of Spin the Wheel?`,
            name: `flow_3high`,
            labels: FlowScale,
            required: true,
        },
        ],
        randomize_question_order: false,
        scale_width: 600,
        on_finish: function(data) {
            spin_num = remainingSpinsReset;
            saveSurveyData(data);
        }
    };

    p.flowMeasure2 = {
        type: jsPsychSurveyLikert,
        preamble: 
        `<div style='padding-top: 50px; width: 900px; font-size:16px'> 
            <p>How immersed and engaged did you feel during Round 2 of Spin the Wheel? </p>
            <p>To report how immersed and engaged you felt, please answer the following questions.</p>
        </div>`,
        questions: [
        {
            prompt: `How immersive was Round 2 of Spin the Wheel?`,
            name: `flow_0low`,
            labels: FlowScale,
            required: true, 
        },
        {
            prompt: `How engaging was Round 2 of Spin the Wheel?`,
            name: `flow_1low`,
            labels: FlowScale,
            required: true,
        },
        {
            prompt: `How engrossing was Round 2 of Spin the Wheel?`,
            name: `flow_2low`,
            labels: FlowScale,
            required: true,
        },
        {
            prompt: `How boring was Round 2 of Spin the Wheel?`,
            name: `flow_3low`,
            labels: FlowScale,
            required: true,
        },
        ],
        randomize_question_order: false,
        scale_width: 600,
        on_finish: function(data) {
            spin_num = remainingSpinsReset;
            saveSurveyData(data);
        }
    };

    
    // emotion measure
    const emotionMeasure = {
        type: jsPsychSurveyMultiSelect,
        questions: [
            {
                prompt: `Which emotion(s) did you feel while watching the video? (Select all that apply.)`,
                options: ['Affection/Warmth', 'Amusement', 'Anger', 'Annoyance', 'Awe', 'Disgust', 'Fear', 'Embarrassment', 'Outrage','Pride', 'Sadness', 'None of the above'],
                required: true },
        ],
        randomize_question_order: false,
        scale_width: 600,
        on_finish: function(data) {
            data.spinsSpun = spinsSpun;
            saveSurveyData(data);
        }
    }; 


    // timeline: main task

    p.preloadHighMI = {
    type: jsPsychPreload,
    video: highMIVideoPaths,
    message: `<p>Now loading the first wheel... </p> <p> As a reminder, you'll be spinning this wheel: </p><p>${highpreviewWheel}</p></ul><br>`,
    on_success: function(file) {
        console.log('Loaded: ', file);
    },
    on_error: function(file) {
        console.error('Failed to load:', file);
    }
};


p.preloadHighMI_examples = {
    type: jsPsychPreload,
    video: highMIexamples,
    message: ` <p>Now loading example videos for Round 1... </p><p>${highpreviewWheel}</p>`,
    on_success: function(file) {
        console.log('Loaded: ', file);
    },
    on_error: function(file) {
        console.error('Failed to load:', file);
    }
};

p.preloadLowMI = {
        type: jsPsychPreload,
        video: lowMIVideoPaths,
        message: `<p> Now loading the second wheel... </p> <p> As a reminder, you'll be spinning this wheel: </p><p>${lowpreviewWheel}<br>`,
        on_success: function(file) {
            console.log('Loaded: ', file);
    }
};

p.preloadLowMI_examples = {
    type: jsPsychPreload,
    video: lowMIexamples,
    message: `<p>Now loading example videos for Round 2... </p><p>${lowpreviewWheel}</p>`,
    on_success: function(file) {
        console.log('Loaded: ', file);
    },
    on_error: function(file) {
        console.error('Failed to load:', file);
    }
};


p.intro_DescriptionsHigh_example0vid = {
            type: jsPsychVideoKeyboardResponse,
            prompt: `${highMIDescripExamples[0]}`,
            stimulus: function() {
            return [`${highMIexamples[0]}`]; 
        },
            width: 640,
            height: 480,
            trial_ends_after_video: true,
            autoplay: true,
            response_ends_trial: false,
            on_finish: function(data) {
        }

        };   


p.intro_DescriptionsHigh_example1vid = {
            type: jsPsychVideoKeyboardResponse,
            prompt: `${highMIDescripExamples[1]}`,
            stimulus: function() {
            return [`${highMIexamples[1]}`]; 
        },
            width: 640,
            height: 480,
            trial_ends_after_video: true,
            autoplay: true,
            response_ends_trial: false,
            on_finish: function(data) {
        }

        };   

p.intro_DescriptionsHigh_example2vid = {
            type: jsPsychVideoKeyboardResponse,
            prompt: `${highMIDescripExamples[2]}`,
            stimulus: function() {
            return [`${highMIexamples[2]}`]; 
        },
            width: 640,
            height: 480,
            trial_ends_after_video: true,
            autoplay: true,
            response_ends_trial: false,
            on_finish: function(data) {
        }

        };   

p.intro_DescriptionsHigh_example3vid = {
            type: jsPsychVideoKeyboardResponse,
            prompt: `${highMIDescripExamples[3]}`,
            stimulus: function() {
            return [`${highMIexamples[3]}`]; 
        },
            width: 640,
            height: 480,
            trial_ends_after_video: true,
            autoplay: true,
            response_ends_trial: false,
            on_finish: function(data) {
        }

        };   

    p.task_highMI = {
        timeline: [spin, video_load, emotionMeasure],
        repetitions: spin_num, //this should be the number of repetitions for each spin + video combo..
        timeline_variables: highMIwheel
    }; 


    p.task_lowMI = {
        timeline: [spin, video_load, emotionMeasure],
        repetitions: spin_num, //this should be the number of repetitions for each spin + video combo..
        timeline_variables: lowMIwheel
    }; 

   /*
    *
    *   Demographics
    *
    */

    p.demographics = (function() {


        const taskComplete = {
            type: jsPsychInstructions,
            pages: html.postTask,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const gender = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your gender?</p>',
            choices: ['Male', 'Female', 'Other'],
            on_finish: (data) => {
                data.gender = data.response;
            }
        };

        const age = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Age:", name: "age"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const ethnicity = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your race?</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
            on_finish: (data) => {
                data.ethnicity = data.response;
            }
        };

        const english = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
            on_finish: (data) => {
                data.english = data.response;
            }
        };  

        const finalWord = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Questions? Comments? Complaints? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const pid = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Please enter your Prolific ID in the space below to receive payment.", rows: 1, columns: 50, name: "pid"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [taskComplete, gender, age, ethnicity, english, finalWord, pid]
        };

        return demos;

    }());


   /*
    *
    *   SAVE DATA & END
    *
    */

p.end = {
        type: jsPsychHtmlButtonResponse,
        stimulus: '<p>Thank you! Please press the button to submit your response and exit the page. </p>',
        choices: ['Submit!'],
        on_finish: (data) => {
            saveSurveyData(data); 
            },
        };


   p.save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "m8l781TEih2C",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    }; 

    return p;

}());


const timeline = [
   exp.consent,
   exp.intro_preChk,
    exp.intro, 
   exp.intro_DescriptionsHigh,
    exp.preloadHighMI_examples, 
    exp.intro_DescriptionsHigh_example0,
    exp.intro_DescriptionsHigh_example0vid,
    exp.intro_DescriptionsHigh_example1,
    exp.intro_DescriptionsHigh_example1vid,
    exp.intro_DescriptionsHigh_example2,
    exp.intro_DescriptionsHigh_example2vid,
    exp.intro_DescriptionsHigh_example3,
    exp.intro_DescriptionsHigh_example3vid,
    exp.intro_HighDescriptionsAfterExamples,
    exp.preloadHighMI, 
   exp.task_highMI,
    exp.flowMeasure1,
    exp.intro_toSecond,
    exp.intro_toSecondChk,
    exp.preloadLowMI_examples, 
   exp.intro_DescriptionsLow_example0,
   exp.intro_DescriptionsLow_example1,
   exp.intro_DescriptionsLow_example2,
   exp.intro_DescriptionsLow_example3, 
   exp.preloadLowMI, 
   exp.task_lowMI, 
   exp.flowMeasure2,
   exp.demographics,
   exp.save_data,
   exp.end]; 


jsPsych.run(timeline);
