import os
from checkSolution import checkSolution


def getProblemInstance(solution):
    path = "../../fileStore/extractedProblemInstances/rcpsp/"+solution
    return path


def extractSolutionFiles(solutionFilesPath):
    for solution in os.listdir(solutionFilesPath):
        problemInstancePath = getProblemInstance(solution)
        solutionFilePath = solutionFilesPath + solution
        return checkSolution(problemInstancePath, solutionFilePath)
