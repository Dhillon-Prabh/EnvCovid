import csv
import pandas as pd
import sqlite3

#read the CSV
df_cases = pd.read_csv('cases.csv')

#connect to a database
conn = sqlite3.connect("temperature.db") #if the db does not exist, this creates a Any_Database_Name.db file in the current directory

#store your table in the database:
df_cases.to_sql('cases', conn, if_exists='replace')

#read a SQL Query out of your database and into a pandas dataframe
sql_string = 'SELECT * FROM cases WHERE countyFIPS <> 0'

df_cases = pd.read_sql(sql_string, conn)

#create a new dataframe with new values
cnames = ['countyFIPS', 'DATE', 'CASES']
new_cases = pd.DataFrame(columns=cnames)

for index, rows in df_cases.iterrows():
    countyFIPS = rows['countyFIPS']
    for column in df_cases[['1/22/20', '1/23/20', '1/24/20', '1/25/20', '1/26/20', '1/27/20', '1/28/20', '1/29/20', '1/30/20', '1/31/20', '2/1/20', '2/2/20', '2/3/20', '2/4/20', '2/5/20', '2/6/20', '2/7/20', '2/8/20', '2/9/20', '2/10/20', '2/11/20', '2/12/20', '2/13/20', '2/14/20', '2/15/20', '2/16/20', '2/17/20', '2/18/20', '2/19/20', '2/20/20', '2/21/20', '2/22/20', '2/23/20', '2/24/20', '2/25/20', '2/26/20', '2/27/20', '2/28/20', '2/29/20', '3/1/20', '3/2/20', '3/3/20', '3/4/20', '3/5/20', '3/6/20', '3/7/20', '3/8/20', '3/9/20', '3/10/20', '3/11/20', '3/12/20', '3/13/20', '3/14/20', '3/15/20', '3/16/20', '3/17/20', '3/18/20', '3/19/20', '3/20/20', '3/21/20', '3/22/20', '3/23/20', '3/24/20', '3/25/20', '3/26/20', '3/27/20', '3/28/20', '3/29/20', '3/30/20', '3/31/20', '4/1/20', '4/2/20', '4/3/20', '4/4/20', '4/5/20', '4/6/20', '4/7/20', '4/8/20', '4/9/20', '4/10/20', '4/11/20', '4/12/20', '4/13/20', '4/14/20', '4/15/20', '4/16/20', '4/17/20', '4/18/20', '4/19/20', '4/20/20', '4/21/20', '4/22/20', '4/23/20', '4/24/20', '4/25/20', '4/26/20', '4/27/20', '4/28/20', '4/29/20', '4/30/20', '5/1/20', '5/2/20', '5/3/20', '5/4/20', '5/5/20', '5/6/20', '5/7/20', '5/8/20', '5/9/20', '5/10/20', '5/11/20', '5/12/20', '5/13/20', '5/14/20', '5/15/20', '5/16/20', '5/17/20', '5/18/20', '5/19/20', '5/20/20', '5/21/20', '5/22/20', '5/23/20', '5/24/20', '5/25/20', '5/26/20', '5/27/20', '5/28/20', '5/29/20']]:
        DATE = column
        CASES = rows[column]
        new_cases = new_cases.append(pd.Series([countyFIPS, DATE, CASES], cnames), ignore_index=True)

# print(new_cases)
new_cases.to_csv('cases2.csv', index=False)
