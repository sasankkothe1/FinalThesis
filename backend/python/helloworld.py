import sys
import os


def read_in():
    line = sys.argv[1]
    return line


def main():

    solutionFilePath = read_in()
    fileNameString = ""

    # print(solutionFilePath)
    print("cwd ", os.getcwd())
    print("only split ", os.path.split(os.getcwd()))
    print("split ", os.path.split(os.getcwd())[0])
    for x in os.listdir(os.path.split(os.getcwd())[0]):
        print(x)


if __name__ == '__main__':
    main()
