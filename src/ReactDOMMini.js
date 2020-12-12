import ReactReconciler from "react-reconciler";

const reconciler = ReactReconciler({
  // Configuration for how to talk to the host env

  supportsMutation: true,

  createInstance: (
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) => {
    // console.log(type, props);
    const ele = document.createElement(type);
    ["alt", "className", "href", "rel", "src", "target"].forEach((tag) => {
      if (props[tag]) ele[tag] = props[tag];
    });

    if (props.onClick) ele.addEventListener("click", props.onClick);

    if (props.bgColor) ele.style.backgroundColor = props.bgColor;

    return ele;
  },

  createTextInstance: (
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) => document.createTextNode(text),

  appendChildToContainer: (container, child) => {
    container.appendChild(child);
  },
  appendChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },

  removeChildFromContainer: (container, child) => {
    container.removeChild(child);
  },
  removeChild: (parent, child) => {
    parent.removeChild(child);
  },
  insertInContainerBefore: (container, child, before) => {
    container.insertBefore(child, before);
  },
  insertBefore: (parent, child, before) => {
    parent.insertBefore(child, before);
  },

  prepareUpdate: (
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    currentHostContext
  ) => {
    if (oldProps.bgColor !== newProps.bgColor)
      return { newBgColor: newProps.bgColor };
  },
  commitUpdate: (
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) => {
    if (updatePayload.newBgColor)
      instance.style.backgroundColor = updatePayload.newBgColor;
  },

  finalizeInitialChildren: () => {},
  getChildHostContext: () => {},
  getPublicInstance: () => {},
  getRootHostContext: () => {},
  prepareForCommit: () => null, // Fix bug to hide logo
  resetAfterCommit: () => {},
  shouldSetTextContent: () => false,
  clearContainer: () => {},
});

const ReactDOMMini = {
  render: (whatToRender, div) => {
    const container = reconciler.createContainer(div, false, false);
    reconciler.updateContainer(whatToRender, container, null, null);
  },
};

export default ReactDOMMini;
