from rcpsp import checkRCPSP


def checkSolution(instanceFile, solutionFile, typeOfInstance):

    # typeOfInstance is in the form rcpsp_sm
    instance = typeOfInstance.split("_")[0]
    mode = typeOfInstance.split("_")[1]

    if (instance == "rcpsp"):
        return checkRCPSP(instanceFile, solutionFile, mode)
