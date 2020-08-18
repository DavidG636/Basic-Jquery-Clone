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
      let tag = elementCollection[Object.keys(elementCollection)[0]].outerHTML;
      tag = tag.substring(1, getPosition(tag, ">", 1));

      element = document.querySelector(tag);
      if (typeof appendParam == "function") {
        element.append($(appendParam()));
      } else {
        element.append($(appendParam));
      }

    };

    return elementCollection;
  }

  function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }



}
