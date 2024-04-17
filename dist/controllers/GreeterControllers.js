export default class GreeterControllers {
    constructor(greeter) {
        this.greeter = greeter;
        this.getLanguages = this.getLanguages.bind(this);
        this.getGreeting = this.getGreeting.bind(this);
        this.getCounter = this.getCounter.bind(this);
        this.addGreeting = this.addGreeting.bind(this);
    }
    async getLanguages(req, res) {
        try {
            const languages = await this.greeter.getLanguages();
            res.status(200).json(languages);
        }
        catch (error) {
            res.status(500).json({ message: "An error occurred while fetching languages." });
        }
    }
    async getGreeting(req, res) {
        try {
            const { username, language } = req.body;
            if (username && language) {
                const greeting = await this.greeter.greet(username, language);
                res.status(200).json(greeting);
            }
            else {
                res.status(400).json({ message: "Username and language are required." });
            }
        }
        catch (error) {
            res.status(500).json({ message: "An error occurred while fetching a greeting." });
        }
    }
    async getCounter(req, res) {
        try {
            const greetCounter = await this.greeter.greetCounter;
            res.status(200).json(greetCounter);
        }
        catch (error) {
            res.status(500).json({ message: "An error occurred while fetching a counter." });
        }
    }
    async addGreeting(req, res) {
        try {
            const { language, greeting } = req.body;
            if (language && greeting) {
                await this.greeter.addGreeting(language, greeting);
                res.status(201).json({ message: "success" });
            }
            else {
                res.status(400).json({ message: "Language and greeting are required." });
            }
        }
        catch (error) {
            res.status(400).json({ message: "An error occurred while creating a greeting." });
        }
    }
}
