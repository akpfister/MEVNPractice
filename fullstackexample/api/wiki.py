import wikipediaapi
import sys

# print(sys.executable)
wiki = wikipediaapi.Wikipedia('en')

page = wiki.page(sys.argv[1])

#print("Page Summary:\n %s" % page.summary[0:500])

print("Search Argument: " + sys.argv[1] + "\nOutput from Python:" + page.text)
# Takes first name and last name via command
# line arguments and then display them
# print("Output from Python")
# print("First name: " + sys.argv[1])
# print("Last name: " + sys.argv[2])

sys.stdout.flush()
