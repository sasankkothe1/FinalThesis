from flask import Flask, request, jsonify
from extractSolutionFiles import extractSolutionFiles
app = Flask(__name__)


@app.route('/', methods=['POST'])
def flaskServer():
    solutionFilesPath = (request.data).decode('utf-8').replace("'", '"')
    solutionFilesPath = solutionFilesPath.split(":")[1][:-1][1:-1]
    isError, error = extractSolutionFiles(solutionFilesPath)
    return jsonify(isError, error)


if __name__ == "__main__":
    # debug, when set to true, automatically reloads the server on file change and saved
    app.run(debug=True)
