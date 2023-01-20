class HomeController {
  async index(req, res) {
    res.json('School API');
  }
}

export default new HomeController();
