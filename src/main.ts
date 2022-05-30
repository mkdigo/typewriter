import './style.css';
import { Typewriter } from './Typewriter';

function typewriterExecute(element: Element) {
  const typewriter = new Typewriter(element, { loop: true });

  typewriter
    .typeString('Where do I Start?')
    .pauseFor(1000)
    .typeString('\n\nfunctio')
    .deleteChars(7)
    .pauseFor(700)
    .deleteAll(10)
    .typeString('Why is this so hard?')
    .pauseFor(1000)
    .typeString('\n\nDoes everyone struggle this much?')
    .pauseFor(1000)
    .typeString('\n\nThere has to be an easier way')
    .pauseFor(1000)
    .deleteAll(10)
    .start();
}

const consoleElement = document.querySelector('#console');

if (consoleElement) typewriterExecute(consoleElement);
