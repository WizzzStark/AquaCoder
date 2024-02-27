
# 🌊 AquaCoder

Welcome to AquaCoder, a real-time mermaid diagram interpreter designed for collaborative use 🤝. This platform leverages the power of Liveblocks to enable multiple users to work on mermaid diagrams simultaneously, in real-time 🚀. Whether you're a team of developers 👩‍💻👨‍💻, a group of students 📚, or just someone looking to create complex diagrams with others, AquaCoder offers a seamless and intuitive interface to bring your ideas to life 🌟.

![AquaCoder_bg](https://github.com/WizzzStark/AquaCoder/assets/85120579/a958ea9e-e4d5-4877-88f4-35e9834c87d3)

## Features 🌈

- **Real-time Collaboration:** Work with team members on the same diagram in real time, thanks to the integration with Liveblocks 🤝.
- **Mermaid Support:** Full support for mermaid syntax, allowing you to create a wide range of diagrams including flowcharts, sequence diagrams, class diagrams, and more 📊.
- **Intuitive Interface:** A user-friendly interface that makes diagram creation as simple as typing markdown ✍️.

## Getting Started 🚀

To start using AquaCoder, follow these simple steps:

1. **Visit [AquaCoder]((https://vercel.com/wizzzstark/aqua-coder))**: Open your browser and go to the AquaCoder website 🌐.
2. **Create or Join a Room**: You can start a new diagram or join an existing session using a unique session ID 📝.
3. **Start Collaborating**: Once in a session, you can start creating your mermaid diagram. Invite others to join by sharing the session ID 🎉.

Or run it locally:

1. Clone reporsitory:

```bash
git clone https://github.com/WizzzStark/ProtoForge
```

2. Install dependecies:

```bash
cd protoforge
npm install
```

3. Create an account in [liveblocks.io](https://liveblocks.io/dashboard)

- Copy public key [administration](https://liveblocks.io/dashboard/apikeys)

- Create `.env.local` and add the variable `LIVEBLOCKS_SECRET_KEY=public_key`


4. Run de server:

```bash
npm run dev
```

## Prerequisites 📋

AquaCoder runs in your web browser, so there's no need to install software on your computer. However, for the best experience, I recommend using the latest version of Google Chrome, Mozilla Firefox, or Safari 🌍.

## Built With 🛠️

- [Next.js](https://nextjs.org/) - The React framework for production
- [Liveblocks](https://liveblocks.io/) - Real-time collaboration APIs
- [Mermaid](https://mermaid-js.github.io/mermaid/#/) - Generation of diagram and flowchart from text in a similar manner as markdown

## Contributing 🤝

Contributions are welcome to AquaCoder! If you have suggestions for improvements or bug fixes, please feel free to fork the repository and submit a pull request.

## License 📄

AquaCoder is released under the MIT License. See the LICENSE file for more details.

## Acknowledgments 👏

- Thanks to the Liveblocks team for making real-time collaboration easier to implement.
- Hat tip to the creators of Mermaid for their fantastic tool that powers our diagram interpretations.

Happy Diagramming! 🎈
