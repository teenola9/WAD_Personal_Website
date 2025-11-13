// Typing utilities and setup

// Name typing settings
const nameText = "MR. TREVOR AKINOLA";
const nameElem = document.getElementById('nameTyping');

// Titles (looped)
const titles = [
  "Founder / CEO of Tadeni LTD",
  "Web App Developer",
  "Data Analyst",
  "Marketing Strategist",
  "UI/UX Developer"
];
const titleElem = document.getElementById('titleTyping');

// Speed configs (ms)
const TYPE_SPEED = 60;
const DELETE_SPEED = 40;
const TITLE_PAUSE = 1200; // pause after typing a title
const BETWEEN_TITLES_PAUSE = 600; // short pause before deleting
const INITIAL_NAME_DELAY = 250; // wait a bit before typing name

// Helper: type text into element, returns Promise when done
function typeText(elem, text, speed = TYPE_SPEED) {
  return new Promise(resolve => {
    elem.textContent = '';
    let i = 0;
    const t = setInterval(() => {
      elem.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(t);
        setTimeout(resolve, 120); // small settle
      }
    }, speed);
  });
}

// Helper: delete text from element, returns Promise when done
function deleteText(elem, speed = DELETE_SPEED) {
  return new Promise(resolve => {
    let current = elem.textContent;
    let i = current.length;
    const t = setInterval(() => {
      i--;
      elem.textContent = current.slice(0, i);
      if (i <= 0) {
        clearInterval(t);
        setTimeout(resolve, 80);
      }
    }, speed);
  });
}

// Typing loop for titles (infinite)
async function loopTitles(list) {
  titleElem.innerHTML = '';
  const span = document.createElement('div');
  span.className = 'title-text';
  titleElem.appendChild(span);

  let index = 0;
  while (true) {
    const txt = list[index];
    await typeText(span, txt, TYPE_SPEED);
    await new Promise(r => setTimeout(r, TITLE_PAUSE));
    await deleteText(span, DELETE_SPEED);
    await new Promise(r => setTimeout(r, BETWEEN_TITLES_PAUSE));
    index = (index + 1) % list.length; // loop
  }
}

// Typing for name (only once)
async function typeNameOnce(text) {
  await new Promise(r => setTimeout(r, INITIAL_NAME_DELAY));
  await typeText(nameElem, text, TYPE_SPEED);
}

// Resume button behavior: toggle 'downloaded' class when clicked to change to blue then revert
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    // Add class for visual feedback
    resumeBtn.classList.add('downloaded');

    // Revert back after 3500ms
    setTimeout(() => {
      resumeBtn.classList.remove('downloaded');
    }, 3500);
    // Browser default will handle the download (download attribute on the link)
  });
}

// Kick off animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  typeNameOnce(nameText).catch(console.error);
  loopTitles(titles).catch(console.error);

  // Highlight "Home" nav item on load (optional)
  const homeLink = document.querySelector('.nav__link[href="#home"]');
  if (homeLink) homeLink.classList.add('active');
});
