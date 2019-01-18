import reactify from 'skatejs-react-integration';
import { DsgInputButton } from '@amyscript/dsg-input-button/dsg-input-button.js';

// Create your constructor.
class DsgInputButtonReact extends DsgInputButton {};

// Define your custom element.
window.customElements.define('dsg-input-button-react', DsgInputButtonReact);

// Reactify it!
export default reactify(DsgInputButtonReact);