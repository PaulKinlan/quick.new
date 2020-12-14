import { html, render } from "lit-html";

const actions = [
  {
    name: "Google Doc",
    url: "https://docs.new",
  },
  {
    name: "Google Sheet",
    url: "https://sheets.new",
  },
  {
    name: "Google Slide",
    url: "https://slides.new",
  },
  {
    name: "Tweet",
    url: "https://twitter.com/compose/tweet",
  }
];

let manifestElement;

const addUrl = (event) => {
  event.preventDefault();
  const form = event.target;
  const main = document.getElementById("main");

  const nameEl = document.getElementsByName("newName")[0];
  const urlEl = document.getElementsByName("newUrl")[0];

  const name = nameEl.value;
  const url = urlEl.value;

  let i = 0;
  for (let field of form.elements) {
    if (field.name == "name") {
      actions[i].name = field.value;
    }

    if (field.name == "url") {
      actions[i].url = field.value;
      i++; // Making a wild assumption that the order is name/url
    }
  }

  if (name != "" && url != "") {
    actions.push({ name, url });
  }

  if (event.submitter.name == "delete") {
    const actionIndex = event.submitter.getAttribute("index");
    actions.splice(actionIndex, 1);
  }

  if (event.submitter.name == "install") {
    installPromptEvent.prompt();
    installPromptEvent = undefined;
  }

  render(template(actions), main);

  const encodedManifest = btoa(JSON.stringify(actions));
  history.pushState(null, "", `/${encodedManifest}/`);
  manifestElement.href = `/${encodedManifest}/manifest.json`;

  nameEl.value = "";
  urlEl.value = "";

  // Add a bespoke SW for page and hope that add2hs triggers after.
  navigator.serviceWorker.register("sw.js");
  // maybe reload.
};

const template = (actions) => html`
  <form @submit=${addUrl}>
    ${actions.map(
      ({ name, url }, i) =>
        html`
          <label>New <input type="text" name="name" value="${name}" /></label>
          <label>Opens <input type="url" name="url" value="${url}" /></label>
          <input
            type="submit"
            name="delete"
            index="${i}"
            value="Remove"
            title="Delete ${name}"
          />
        `
    )}

    <fieldset>
      <legend>Add New Shortcut</legend>
      <label>New <input type="text" name="newName" value="" placeholder="Name of action" /></label>
      <label for="newUrl">Opens <input type="url" name="newUrl" value="" placeholder="https://..." /></label>
    </fieldset>
    <div class="buttons">
      <button type="submit">Create Launcher</button>
      <input
        type="submit"
        name="install"
        ?disabled=${installPromptEvent === undefined}
        value="Install"
      />
    </div>
  </form>
`;

onload = () => {
  const main = document.getElementById("main");
  manifestElement = document.getElementById("manifest");

  const pathSearch = /\/(.+)\//.exec(location.pathname);

  if (pathSearch && pathSearch.length > 1) {
    const encodedManifest = pathSearch[1];
    manifestElement.href = `/${encodedManifest}/manifest.json`;

    // update the data
    actions.length = 0;
    Array.prototype.push.apply(actions, JSON.parse(atob(encodedManifest)));
  }

  render(template(actions), main);

  navigator.serviceWorker.register("sw.js");
};

let installPromptEvent;
onbeforeinstallprompt = (event) => {
  event.preventDefault();
  installPromptEvent = event;
  render(template(actions), main);
};
