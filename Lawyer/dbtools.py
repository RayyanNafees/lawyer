
'''Allows you to create a MySQL database & tables without the need to do so...
   You just need to provide credentials (but skipping them will use the default '''

import mysql.connector

user = 'ping'
local = '127.0.0.1'
    
dbconfig = {'host': local,
            'user': user,
            'password': 'Manofaction.1',
            'database': user+'$default', }


class UseDatabase:

    def __init__(self, config: dict):
        self.config = config


    def __enter__(self):
        self.conn = mysql.connector.connect(**self.config)
        self.cursor = self.conn.cursor()
        return self.cursor


    def __exit__(self, exc_type, exc_value, exc_trace):
        self.conn.commit()
        self.cursor.close()
        self.conn.close()



def prereq(host = None):
    '''Initializes the DB setup'''
    if host: dbconfig['host'] = host
    conn = mysql.connector.connect(**dbconfig)
    cursor = conn.cursor()
    return (conn,cursor)


def createDB(newDBname, username, password = 'Manofaction.1', save = True):
    usr = dbconfig['user']
    db = dbconfig['database']
    dbconfig['user'] = 'root'
    dbconfig.pop('database')
    
    conn, cursor = prereq()
    
    cursor.execute(f'create database {newDBname};')
    cursor.execute(f"grant all on {newDBname}.* to '{username}' identified by '{password}';")
    conn.commit()
    cursor.close()
    conn.close()

    dbconfig['user'] = usr
    dbconfig['database'] = db

    if save and __name__ == '__main__':
        with open(f'{newDBname}info.txt','w') as info:
            info.write(f'''database: {newDBname}
                           user: {username}
                           password: {password}''')


def create_table(tabname, fields: dict, id_ts = True):
    '''Creates the table from the supplied values:
    dbname:  Name of the database to create the table in
    tabname: Name for the created table
    fields:  A dict of field_name(key , heading) & varchar_values(value, charlen)
    id_ts:   Automatically add serial no. & timestamp as 2 starting fields'''

    prifields = '''id int auto_increment primary key,
                   ts timestamp default current_timestamp,'''

    id_ts = prifields if id_ts else ''

    _sql = f'create table {tabname} (\n {id_ts} \n'

    _sql += ','.join(f'\n{field} varchar({vc}) not null' for field, vc in fields.items()) + ' );'

    conn, cursor = prereq()
    cursor.execute(_sql)
    conn.commit()
    cursor.close()
    conn.close()



