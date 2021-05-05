import os
import sys


global isError
global errorMessage


class Node():

    def __init__(self):
        self.predecessors = []
        self.successors = []
        self.modes = []
        self.renewable_resource_requirements = []
        self.nonrenewable_resource_requirements = []
        self.durations = []
        self.start = None
        self.execution_mode = None
        self.name = None
        self.number_of_modes = None
        self.lft = None
        self.lst = None
        self.eft = None
        self.est = None
        self.finish = None

    def add_predecessor(self, node):
        self.predecessors.append(node)

    def add_successor(self, node):
        self.successors.append(node)


class Project():

    isError = False
    error = None

    def __init__(self):
        self.renewable_resourceavailability = []
        self.non_renewable_resourceavailability = []
        self.number_of_jobs = None
        self.number_of_renewable_resources = None
        self.number_of_nonrenewable_resources = None
        self.number_of_doubly_constrained_resources = None
        self.node_dict = dict()
        self.set_of_nodes = []
        self.horizon_T = 0
        self.population = []

        # for solution testing
        self.claimed_makespan = None

    def readProject(self, filename):
        dirname = os.path.dirname(__file__)

        filename = os.path.join(dirname, filename)

        with open(filename, 'r') as file:
            file = list(file)
            for line_index, line in enumerate(file):

                if "projects" in line:

                    # Get number of jobs
                    dummy = file[line_index + 1].split(" ")
                    dummy = list(filter(None, dummy))
                    self.number_of_jobs = int(dummy[-1])
                    self.number_of_nondummy_jobs = self.number_of_jobs - 2

                    # Get number of renewable resources
                    dummy = file[line_index + 4].split(" ")
                    dummy = list(filter(None, dummy))
                    self.number_of_renewable_resources = int(dummy[-2])

                    # Get number of nonrenewable resources
                    dummy = file[line_index + 5].split(" ")
                    dummy = list(filter(None, dummy))
                    self.number_of_nonrenewable_resources = int(dummy[-2])

                    for i in range(self.number_of_jobs):
                        dummy = Node()
                        dummy.name = str(i + 1)
                        self.node_dict[int(dummy.name)] = dummy

                elif "PRECEDENCE RELATIONS:" in line:

                    # extract precedence relationships
                    precedence_descripton_line_index = line_index + 2

                    for i, precedence_relationship in enumerate(file[
                                                                precedence_descripton_line_index:precedence_descripton_line_index + self.number_of_jobs]):
                        precedence_relationship = precedence_relationship.rstrip()
                        precedence_relationship = precedence_relationship.split(
                            " ")

                        precedence_relationship = filter(
                            None, precedence_relationship)

                        precedence_relationship = [
                            int(_) for _ in precedence_relationship]

                        number_of_successors = precedence_relationship[2]
                        number_of_modes = precedence_relationship[1]
                        self.node_dict[i + 1].number_of_modes = number_of_modes

                        list_of_successors = precedence_relationship[-number_of_successors:]
                        if number_of_successors == 0:
                            list_of_successors = []

                        for successor in list_of_successors:
                            self.node_dict[i +
                                           1].add_successor(self.node_dict[successor])

                    for node_id, node_obj in self.node_dict.items():
                        self.set_of_nodes.append(node_obj)
                        for successor in node_obj.successors:
                            successor.add_predecessor(node_obj)

                elif "REQUESTS/DURATIONS:" in line:

                    # Duration of each activity in each mode and corresponding resource consumption
                    requests_description_line_index = line_index + 3

                    number_of_relevant_lines = 0

                    number_of_entries = file[requests_description_line_index]
                    number_of_entries = number_of_entries.rstrip()
                    number_of_entries = number_of_entries.split(" ")
                    number_of_entries = list(filter(None, number_of_entries))
                    number_of_entries = len(number_of_entries)

                    while "*" not in file[requests_description_line_index + number_of_relevant_lines]:
                        line = file[requests_description_line_index +
                                    number_of_relevant_lines]
                        line = line.rstrip()
                        line = line.split(" ")
                        line = filter(None, line)
                        line = [int(_) for _ in line]

                        if len(line) == number_of_entries:
                            previous_job_nr = line[0]
                        else:
                            line.insert(0, previous_job_nr)

                        current_node = self.node_dict[line[0]]

                        current_node.durations.append(line[2])

                        renewable_consumption = []
                        nonrenewable_consumption = []

                        for elem in line[3:3 + self.number_of_renewable_resources]:
                            renewable_consumption.append(elem)

                        for elem in line[3 + self.number_of_renewable_resources:]:
                            nonrenewable_consumption.append(elem)

                        current_node.renewable_resource_requirements.append(
                            renewable_consumption)
                        current_node.nonrenewable_resource_requirements.append(
                            nonrenewable_consumption)

                        number_of_relevant_lines += 1

                elif "RESOURCEAVAILABILITIES:" in line:
                    resource_description_line_index = line_index + 2
                    line = file[resource_description_line_index]
                    line = line.rstrip()
                    line = line.split(" ")
                    line = filter(None, line)
                    line = [int(_) for _ in line]

                    self.renewable_resourceavailability = line[:
                                                               self.number_of_renewable_resources]
                    self.non_renewable_resourceavailability = line[self.number_of_renewable_resources:]

        for node in self.set_of_nodes:
            self.horizon_T += max(node.durations)

    def read_solution(self, filename):
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, filename)

        with open(filename, 'r') as file:
            file = list(file)
            for line_index, line in enumerate(file):

                if "Makespan" in line:
                    makespan = line.split(":")
                    self.claimed_makespan = int(makespan[1])

        with open(filename, 'r') as file:
            file = list(file)
            for line_index, line in enumerate(file):

                if "Makespan" in line:

                    makespan = line.split(":")
                    self.claimed_makespan = int(makespan[1])
                elif "Solution" in line:
                    line_offset = 3
                    line_first_job = line_index + line_offset

                    for i in range(self.number_of_jobs):
                        job_info = file[line_first_job + i].split("\t")
                        self.set_of_nodes[i].execution_mode = int(job_info[1])
                        self.set_of_nodes[i].start = int(job_info[2])

                    break

    def test_solution(self):

        # This test checks for adhering to: Precedence constraints and renewable resource constraints
        # Depending on the problem type, there are more constraint violations that should be checked:
        # Non-renewable resources
        # Doubly-constrained resources
        # These also need to be implemented

        for node in self.set_of_nodes:
            node.finish = node.start + node.durations[node.execution_mode - 1]
            # print(node.finish)

        resource_consumption_profiles = []

        print(len(self.set_of_nodes))
        # print(self.renewable_resourceavailability[:])

        for t in range(self.claimed_makespan + 1):

            resource_availability_t = self.renewable_resourceavailability[:]

            resource_consumption_t = [0] * self.number_of_renewable_resources

            active_nodes = []

            for node in self.set_of_nodes:
                # print(node.start, node.finish)
                # check if node is active:
                if node.start <= t and node.finish > t:
                    # check whether precedence constraint is violated
                    active_nodes.append(node.name)
                    for predecessor_node in node.predecessors:
                        if predecessor_node.finish <= t:
                            pass
                        else:
                            self.isError = True
                            self.error = "Error! Precedence violated, " + "node: " + node.name + \
                                " ,predecessor: " + predecessor_node.name
                            break
                            # print("Error! Precedence violated")
                            # print("node: " + node.name)
                            # print("predecessor: " + predecessor_node.name)
                            # print("active nodes:")
                            # print(active_nodes)
                            # break
                    # check whether renewable resource consumption constraint is violated
                    for resource_index in range(self.number_of_renewable_resources):
                        resource_availability_t[resource_index] -= \
                            node.renewable_resource_requirements[node.execution_mode -
                                                                 1][resource_index]
                        resource_consumption_t[resource_index] += \
                            node.renewable_resource_requirements[node.execution_mode -
                                                                 1][resource_index]
                        if resource_availability_t[resource_index] < 0:
                            self.isError = True
                            self.error = "Error! Resource Consumption violated, " + "resource_index: " + str(resource_index) + \
                                ", t: " + str(t)
                            break
                            # print("Error! Resource Consumption violated")
                            # print("resource_index : " + str(resource_index))
                            # print("t: " + str(t))
                            # print("active nodes:")
                            # print(active_nodes)

            resource_consumption_profiles.append(resource_consumption_t)

        time_range = range(self.claimed_makespan + 1)

        if(self.claimed_makespan != max([_.finish for _ in self.set_of_nodes])):
            self.isError = True
            self.error = "The makespan is incorrect. Total Duration is: ", max(
                [_.finish for _ in self.set_of_nodes])

        # print("self.claimed_makespan ", self.claimed_makespan)

        # print("Duration:")
        # print(max([_.finish for _ in self.set_of_nodes]))

        # print("valid_solution!")


def checkSolution(problemInstancePath, solutionFilePath):
    p = Project()
    p.readProject(problemInstancePath)
    p.read_solution(solutionFilePath)
    p.test_solution()
    print(p.isError)
    print(p.error)
    return p.isError, p.error
