document.getElementById("save-url").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;

  // alert(`save url clicked blahh = ${url}`);

  fetch("http://localhost:8000/api/save-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  })
    .then((response) => response.json())
    .then((data) => alert("URL saved!"))
    .catch((error) => console.error("Error:", error));
});

document.getElementById("view-urls").addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:3000" });
});
