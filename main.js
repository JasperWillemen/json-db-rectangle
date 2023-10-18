import randomColor from "randomcolor";
import "./style.scss";

const basePath = "http://localhost:3000/rectangles/";

async function main() {
  const rectangleRef = document.querySelector("container");
  render(rectangleRef);

  rectangleRef.onclick = async (e) => {
    // console.log(e.target.dataset.id);
    // console.log(e.target.style.backgroundColor);
    e.target.style.backgroundColor = randomColor();
    const id = e.target.dataset.id;
    const response = await fetch(basePath + id, {
      method: "PATCH",
      body: JSON.stringify({
        color: e.target.style.backgroundColor,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    // await response.json();
    // render();
  };

  rectangleRef.ondblclick = async (e) => {
    const id = e.target.dataset.id;
    const response = await fetch(basePath + id, {
      method: "DELETE",
    });
    await response.json();
    render(rectangleRef);
  };
}

main();

async function render(rectangleRef) {
  const response = await fetch(basePath);
  const data = await response.json();
  rectangleRef.innerHTML = data
    .map(
      ({ id, color, width, height, x, y }) => `
        <div data-id = ${id} style="background-color:${color};width:${width};height:${height};margin-left:${x};margin-top:${y}"></div>`
    )
    .join("");
}
