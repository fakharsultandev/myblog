async function handleRenderHome(req, res) {
  res.render("index", { title: "Home" });
}

module.exports = {
  handleRenderHome
}