def extractLowerBounds(file):
    solutionTupleList = []
    filename = file.split('/')[-1]
    with open(file, mode='r', errors='ignore') as temp:
        lines = list(temp)
        for index, line in enumerate(lines):
            if "Instance Set" in line:
                inst_set = line.split(":")[-1]
            if "Parameter" in line:
                lowerBoundsChunk = lines[index + 2: len(lines) - 2]
                for el in lowerBoundsChunk:
                    inst_param, inst_num, lb = el.split()
                    # solutionTupleList.append(
                    #     {"job": job.rstrip(), "par": par.rstrip(), "inst": inst.rstrip(), "lb": lowerbound.rstrip()})
                    solutionTupleList.append((
                        filename, inst_set.rstrip(), inst_param.rstrip(), inst_num.rstrip(), file, "not submitted", lb, False, False))

    return solutionTupleList
    # return the final solutionTupleList => (fileName, inst_set, inst_param, inst_num, solutionFilesPath, makespan, lb, isError, error)
