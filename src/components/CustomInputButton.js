import reactify from "skatejs-react-integration";
import { CustomInputButton } from "@amyscript/custom-input-button";

// Create your constructor.
class CustomInputButtonReact extends CustomInputButton {}

// Define your custom element.
window.customElements.define(
  "custom-input-button-react",
  CustomInputButtonReact
);

// Reactify it!
export default reactify(CustomInputButtonReact);
