// --- DOM Elements ---
const welcomeSection = document.getElementById('welcome-section');
const moodSection = document.getElementById('mood-section');
const capybaraSection = document.getElementById('capybara-section');
const capybaraText = document.getElementById('capybara-text');
const capybaraImg = document.getElementById('capybara-img');
const capybaraResponse = document.getElementById('capybara-response');
const followupText = document.getElementById('followup-text');
const noNeedSection = document.getElementById('no-need-section');
const finalAskSection = document.getElementById('final-ask-section');
const byeSection = document.getElementById('bye-section');

// Buttons
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const moodBtns = document.querySelectorAll('.mood-btn');
const stillYesBtn = document.getElementById('still-yes');
const stillNoBtn = document.getElementById('still-no');
const sureYesBtn = document.getElementById('sure-yes');
const sureNoBtn = document.getElementById('sure-no');
const finalYesBtn = document.getElementById('final-yes');
const finalNoBtn = document.getElementById('final-no');

let currentMood = '';
let capybaraTimer;
let lastShownGif = ''; // Track last shown GIF

// --- Capybara content per mood ---
const capybaraContent = {
    mad: ['clips/capy-mcdo.gif','clips/capy-shade.gif','clips/capy-stomach.gif','clips/capy-cooked.gif','clips/capy-sleeping.gif','clips/capy-ride.gif'],
    sad: ['clips/capy-rio.gif','clips/capy-orange.gif','clips/capy-pumpkin.gif','clips/capy-ducks.gif','clips/capy-eating.gif','clips/capy-crocs.gif'],
    crying: ['clips/capy-bath.gif','clips/capy-dancing.gif','clips/capy-pet.gif','clips/capy-shower.gif','clips/capy-lol.gif','clips/capy-ears.gif'],
    happy: ['clips/capy-lol.gif','clips/capy-rio.gif','clips/capy-dancing.gif','clips/capy-shade.gif','clips/capy-eating.gif','clips/capy-mcdo.gif']
};

const followupMessages = {
    mad: "Are you still mad?",
    sad: "Are you still feeling sad?",
    crying: "Are you still crying?",
};

const finalMessages = {
    mad: "I’m glad you’re calming down 😊",
    sad: "I’m glad to see you smiling again 😄",
    crying: "I’m happy you feel better now ❤️",
    happy: "I’m glad you’re happy 😄"
};

// --------------------------------------------------
// --- GIF Slideshow ---
// --------------------------------------------------
function playGifSlideshow(gifArray, imgElementId, duration = 10000, onComplete) {
    let index = 0;
    const imgElement = document.getElementById(imgElementId);
    const totalToShow = gifArray.length;
    const intervalTime = duration / totalToShow;

    imgElement.src = gifArray[index];

    const interval = setInterval(() => {
        index++;
        if (index >= gifArray.length) {
            clearInterval(interval);
            if (onComplete) onComplete();
            return;
        }
        imgElement.src = gifArray[index];
    }, intervalTime);
}

function getRandomGifs(mood, count = 3) {
    const images = capybaraContent[mood];
    const filtered = images.filter(img => img !== lastShownGif);
    const pool = filtered.length > 0 ? filtered : images;
    const selected = [];

    while (selected.length < count) {
        const idx = Math.floor(Math.random() * pool.length);
        if (!selected.includes(pool[idx])) selected.push(pool[idx]);
    }

    lastShownGif = selected[selected.length - 1]; 
    return selected;
}

// --------------------------------------------------
// --- Welcome Section ---
// --------------------------------------------------
yesBtn.addEventListener('click', () => {
    welcomeSection.classList.remove('active');
    moodSection.classList.add('active');
});

noBtn.addEventListener('click', () => {
    welcomeSection.classList.remove('active');
    noNeedSection.classList.add('active');
});

// --------------------------------------------------
// --- Mood Selection ---
// --------------------------------------------------
moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentMood = btn.dataset.mood;
        moodSection.classList.remove('active');
        startMoodCheer(currentMood);
    });
});

// --------------------------------------------------
// --- Mood Cheer & Follow-up ---
// --------------------------------------------------
function startMoodCheer(mood) {
    capybaraSection.classList.add('active');
    capybaraText.textContent = "Here's a capybara to cheer you up!";
    capybaraResponse.style.display = 'none';

    playGifSlideshow(getRandomGifs(mood, 3), "capybara-img", 10000, () => {
        if (mood !== 'happy') {
            capybaraResponse.style.display = 'block';
            followupText.textContent = followupMessages[mood];
        } else {
            showFinalMessage();
        }
    });
}

stillYesBtn.addEventListener('click', () => {
    capybaraResponse.style.display = 'none';
    playGifSlideshow(getRandomGifs(currentMood, 3), "capybara-img", 10000, () => {
        capybaraResponse.style.display = 'block';
        followupText.textContent = followupMessages[currentMood];
    });
});

stillNoBtn.addEventListener('click', () => {
    capybaraResponse.style.display = 'none';
    showFinalMessage();
});

// --------------------------------------------------
// --- Final Message & Ask ---
// --------------------------------------------------
function showFinalMessage() {
    capybaraText.textContent = finalMessages[currentMood];
    setTimeout(() => {
        capybaraSection.classList.remove('active');
        finalAskSection.classList.add('active');
    }, 1000);
}

// --------------------------------------------------
// --- No Need Section ---
// --------------------------------------------------
sureYesBtn.addEventListener('click', () => {
    noNeedSection.classList.remove('active');
    capybaraText.textContent = "I’m always here for you if you need me ❤️";
    capybaraSection.classList.add('active');
    playGifSlideshow(['clips/capy-bye.gif'], "capybara-img", 10000);
});

sureNoBtn.addEventListener('click', () => {
    noNeedSection.classList.remove('active');
    moodSection.classList.add('active');
});

// --------------------------------------------------
// --- Final Ask Section (Yay loop) ---
// --------------------------------------------------
finalYesBtn.addEventListener('click', () => {
    finalAskSection.classList.remove('active');
    startYayLoop();
});

finalNoBtn.addEventListener('click', () => {
    finalAskSection.classList.remove('active');
    capybaraSection.classList.remove('active');
    byeSection.classList.add('active');
});

function startYayLoop() {
    capybaraSection.classList.add('active');
    capybaraText.textContent = "Yay! Let's keep enjoying capybaras 🐾";
    capybaraResponse.style.display = 'none';
    playGifSlideshow(getRandomGifs('happy', 5), "capybara-img", 10000, () => {

        capybaraSection.classList.remove('active');
        finalAskSection.classList.add('active');
    });
}