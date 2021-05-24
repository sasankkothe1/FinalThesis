import json

with open("./config.json") as config_file:
    config = json.load(config_file)


class Config:
    ProblemSetsLocation = "../../fileStore/problemSets"
    SolutionsDirectory = "../../fileStore/UploadedSolutions"
