# OBS Streaming and Chat Application

Welcome to the OBS Streaming and Chat Application! This project aims to provide a platform where users can stream content using OBS (Open Broadcaster Software) and engage in real-time chat with viewers.

## Table of Contents

1. [Features](#features)
2. [Setup Instructions](#setup-instructions)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [Issues](#issues)
6. [License](#license)
7. [Acknowledgements](#acknowledgements)
8. [Contact](#contact)

## Features

- **Streaming with OBS**: Utilize OBS to broadcast your content live to viewers.
- **Real-time Chat**: Engage with your audience through the built-in chat feature.
- **MERN Stack**: Built using the MERN (MongoDB, Express.js, React, Node.js) stack for a powerful and efficient development experience.
- **Authentication**: Secure user authentication system to manage user accounts and sessions.
- **Responsive Design**: User-friendly interface designed to work seamlessly across various devices.

## Setup Instructions

1. **Clone the Repository**: 
   ```
   git clone https://github.com/H4mxa/obs-streaming-application.git
   ```

2. **Install Dependencies**:
   - Navigate to the project directory:
     ```
     cd obs-streaming-application
     ```
   - Install server dependencies:
     ```
     npm install
     ```
   - Navigate to the client directory:
     ```
     cd client
     ```
   - Install client dependencies:
     ```
     npm install
     ```

3. **Set Environment Variables**:
   - Create a `.env` file in the root directory and provide the necessary environment variables. You can use the `.env.example` file as a reference.

4. **Start the Development Server**:
   - Return to the root directory:
     ```
     cd ..
     ```
   - Start the server, Client and RTMP-Server:
     ```
     npm run watch
     ```

5. **Access the Application**:
   - Open your web browser and navigate to `http://localhost:8000` to access the application.

## Usage

1. **Register/Login**:
   - If you're a new user, register for an account. If you already have an account, log in using your credentials.

2. **Stream Content with OBS**:
   - Set up OBS to stream content.
   - Use the provided stream key located at your My Account page to connect OBS to the application.

3. **Engage with Viewers**:
   - As viewers join the stream, they can interact with you through the chat feature.
   - Respond to messages and interact with your audience in real-time.

4. **End Stream**:
   - Once you're done streaming, stop the OBS broadcast and disconnect from the application.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:
- Fork the repository
- Create a new branch (`git checkout -b feature`)
- Make your changes
- Commit your changes (`git commit -am 'Add new feature'`)
- Push to the branch (`git push origin feature`)
- Create a pull request

## Issues

If you encounter any issues or have suggestions for improvement, please feel free to open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/H4mxa/obs-streaming-application/blob/main/LICENSE) file for details.

## Acknowledgements

Special thanks to the contributors and developers of the libraries and frameworks used in this project.

## Contact

For any inquiries or support, you can reach out to the project owner [here](https://github.com/H4mxa).

Thank you for using the OBS Streaming and Chat Application! We hope you enjoy streaming and engaging with your audience.

--- 

This format provides a clear structure for users to navigate through different sections of the README file. Each section provides essential information about the project, including setup instructions, usage guidelines, contribution guidelines, licensing information, acknowledgements, and contact details.
