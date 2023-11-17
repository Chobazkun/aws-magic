# 🧙 AWS Magic CLI Tool

## Overview
`aws-magic` is a CLI tool that leverages the OpenAI API to translate natural language descriptions into AWS CLI commands. It allows users to input a description of the task they want to perform with AWS, and then suggests the corresponding AWS CLI command.

## Features
- **Configure OpenAI API Key 🔑**: Set up your OpenAI API key for the tool.
- **Translate Descriptions to AWS CLI Commands 💬**: Input a description and get a suggested AWS CLI command.
- **Command Execution Confirmation ✅**: Users can choose to execute the suggested command directly from the CLI.

## Installation

### For Users
To install `aws-magic` globally and use it from anywhere in your command line interface, run:

```bash
npm install -g aws-magic
```

### For project contributors
If you are a developer and want to contribute to `aws-magic`, clone the repository and run the following command in the project directory to install dependencies:

1. Run `npm install` to install the required dependencies.
2. Use `npm link` to symlink the package globally for development testing.

## Usage
- **Configuration**:
  - Run `aws-magic configure` to set up your OpenAI API key.

- **Translating Text**:
  - Run `aws-magic "<your description here>"` to receive a suggested AWS CLI command for your description.
  - Confirm execution of the command directly within the CLI.

## Contributing
Contributions to `aws-magic` are welcome. Please ensure to follow the project's code style and contribution guidelines.

## License
[MIT License](LICENSE)

**Note**: This tool uses the OpenAI API and is subject to their usage terms and conditions.
