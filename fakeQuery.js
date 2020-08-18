const $ = (...args) => {
  if (typeof args[0] == "function") {
    const functionBody = args[0];
    document.addEventListener("DOMContentLoaded", functionBody);
  } else if (typeof args[0] == "string" || args[0] instanceof HTMLElement) {
    let elementCollection;
    if (args[0] instanceof HTMLElement) {
      elementCollection = args[0];
    } else {
      try {
        elementCollection = document.querySelectorAll(args[0]);
      } catch (err) {
        let tempString = args[0];
        let text = tempString.substring((getPosition(tempString, ">", 1) + 1), getPosition(tempString, "<", 2));
        let elementTag = tempString.substring(1, getPosition(tempString, ">", 1));

        elementCollection = document.createElement(elementTag);
        let node = document.createTextNode(text);
        elementCollection.appendChild(node);

      }
    }

    elementCollection.css = (...cssArgs) => {
      if (args[0] != elementCollection) {
        elementCollection.forEach((element, i) => {
          const stylingProperty = cssArgs[0];
          if (cssArgs.length == 1) {
            const computedStyle = getComputedStyle(element);
            for (const [key, value] of Object.entries(computedStyle)) {
              if (key == stylingProperty) {
                return value;
              }
            }
          } else {
            const stylingValue = cssArgs[1];
            element.style[stylingProperty] = stylingValue;
          }
        });
      } else {
        const stylingProperty = cssArgs[0];
        if (cssArgs.length == 1) {
          const computedStyle = getComputedStyle(elementCollection);
          for (const [key, value] of Object.entries(computedStyle)) {
            if (key == stylingProperty) {
              return value;
            }
          }
        } else {
          const stylingValue = cssArgs[1];
          elementCollection.style[stylingProperty] = stylingValue;
        }
      }

    }

    elementCollection.click = (executableFunction) => {
      elementCollection.forEach((element, i) => {
        element.addEventListener("click", executableFunction);
      });
    }

    elementCollection.append = (appendParam) => {
      let element;
      let tag = elementCollection[Object.keys(elementCollection)[0]].localName;

      if (elementCollection[Object.keys(elementCollection)[0]].className != "") {
        tag = tag + "." + elementCollection[Object.keys(elementCollection)[0]].className
      }

      if (elementCollection[Object.keys(elementCollection)[0]].id != "") {
        tag = tag + "#" + elementCollection[Object.keys(elementCollection)[0]].id;
      }

      element = document.querySelector(tag);
      if (typeof appendParam == "function") {
        element.append($(appendParam()));
      } else {
        element.append($(appendParam));
      }

    };

    elementCollection.remove = () => {
      let parentNode = elementCollection[Object.keys(elementCollection)[0]].parentNode;
      let childSelector = elementCollection[Object.keys(elementCollection)[0]].localName;

      if (elementCollection[Object.keys(elementCollection)[0]].className != "") {
        childSelector = childSelector + "." + elementCollection[Object.keys(elementCollection)[0]].className
      }

      if (elementCollection[Object.keys(elementCollection)[0]].id != "") {
        childSelector = childSelector + "#" + elementCollection[Object.keys(elementCollection)[0]].id;
      }

      let childNode = document.querySelector(childSelector);

      parentNode.removeChild(childNode)

    }

    return elementCollection;
  }

  function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }



}
