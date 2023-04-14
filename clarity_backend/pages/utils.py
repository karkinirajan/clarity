from rest_framework.views import exception_handler
from .models import *
import csv
import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
import os
import pandas as pd


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data["status_code"] = response.status_code

    return response


# def upload_tags_from_csv():
#     file_path = os.path.abspath("complete.csv")
#     if os.path.isfile(file_path):
#         with open(file_path, "r") as csv_file:
#             df = pd.read_csv(csv_file)
#             for index, row in df.iterrows():
#                 company_name = row["company_name"]
#                 tag = row["tags"]

#                 try:
#                     companies = Company.objects.filter(company_name=company_name)
#                     if companies.count() > 0:
#                         company = companies.first()
#                         tag = Tag.objects.create(tag=tag)
#                     else:
#                         print("Company with name {} not found".format(company_name))
#                 except Company.DoesNotExist:
#                     print("Company with name {} not found".format(company_name))

#     else:
#         print("File not found at : ", file_path)


# Read the CSV file containing the links and company names
def upload_images_from_csv():
    with open("result.csv", "r") as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        for row in reader:
            link = row[1]
            company_name = row[2]

            # Make a request to the link to download the image
            if link == "":
                continue
            response = requests.get(link)
            if response.status_code == 200 and response.content is not None:
                # Open a temporary file
                temp_file = NamedTemporaryFile(delete=False)

                # Write the image content to the temporary file
                temp_file.write(response.content)
                temp_file.flush()
                temp_file.seek(0)

                # Create a File object
                image_file = File(temp_file)

                # Fetch the related company from the database
                try:
                    company = Company.objects.get(company_name=company_name)
                    # Save the File object to the company's `logo` field
                    company.logo.save("logo.png", image_file, save=True)
                except Company.DoesNotExist:
                    print(f"Company {company_name} does not exist in the database")

                # # Save the File object to the company's `logo` field
                # company.logo.save("logo.png", image_file, save=True)

                # Close the temporary file
                temp_file.close()
            else:
                print(
                    f"Failed to download image from {link} or link to company {company_name} is not available"
                )
