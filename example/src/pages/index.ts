import { attachScrollbar } from "#/components/scrollbar";

const createBlock = (): HTMLDivElement => {
    const el: HTMLDivElement = document.createElement("div");
    el.style.display = "block";
    el.style.width = "200px";
    el.style.height = "200px";
    el.style.border = "1px solid black";

    return el;
};

const subBlock: HTMLDivElement = document.createElement("div");
subBlock.style.display = "block";
subBlock.style.width = "600px";
subBlock.style.height = "600px";
subBlock.innerText = "Block";

const block1: HTMLElement = createBlock();

block1.appendChild(subBlock);

attachScrollbar(block1);

const subVBlock: HTMLDivElement = document.createElement("div");
subVBlock.style.display = "block";
subVBlock.style.height = "600px";
subVBlock.innerText = "Vertical Block";

const block2: HTMLDivElement = createBlock();

block2.appendChild(subVBlock);

attachScrollbar(block2);

const subHBlock: HTMLDivElement = document.createElement("div");
subHBlock.style.display = "block";
subHBlock.style.width = "600px";
subHBlock.innerText = "Horizontal Block";

const block3: HTMLDivElement = createBlock();

block3.appendChild(subHBlock);

attachScrollbar(block3);

const background: HTMLDivElement = document.createElement("div");
background.style.display = "block";
background.style.width = "3000px";
background.style.height = "3000px";

const page: HTMLDivElement = document.createElement("div");

page.appendChild(block1);
page.appendChild(block2);
page.appendChild(block3);
page.appendChild(background);

export { page };
