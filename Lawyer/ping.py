from flask import Flask, request, render_template
from flask_mail import Mail, Message    
from json import dumps, loads
from mysql.connector import connect
from dbtools import UseDatabase

app = Flask(__name__)
mail= Mail(app)

app.config['dbconfig'] =  {'host': '127.0.0.1' if __name__=='__main__' else 'ping.mysql.pythonanywhere-services.com',
                           'user': 'ping',
                           'password': 'Manofaction.1',
                           'database': 'ping$default'}

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/login/<usr>', methods=['POST'])
def login(usr):
    
    try:
        with UseDatabase(app.config['dbconfig']) as cursor:
            _SQl = '''\
            insert into logins
            (name, ip, browser) 
            value
            (%s, %s, %s)
            '''                        
            cursor.execute(_SQL,(usr, request.remote_addr, request.user_agent.browser))
        
        return 'login successful'
    
    except Exception as err:        
        return 'Cannot login:' + err
    

# Communication:

@app.route("/mail/<password>")
def index(password):
    spec = loads(request.form['specs'])
    app.config['MAIL_SERVER']='smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = spec['from']
    app.config['MAIL_PASSWORD'] = spec['passwd']
    app.config['MAIL_USE_TLS'] = True   # False
    app.config['MAIL_USE_SSL'] = True
    mail = Mail(app)

    msg = Message(spec['title'], sender = spec['from'], recipients = [spec['to']])
    msg.body = spec['body']
    mail.send(msg)
    return "Sent"


# Messenger:

app.config['msgs'] = []

@app.route('/pending', methods = ['POST'])
def pend():
    msgbox = app.config
        
    if not request.form:
        msgs = dumps(msgbox['msgs'])
        msgbox['msgs'] = []
        return msgs
    
    msgbox['msgs'].append(request.form['msg'])


if __name__ == '__main__':
        
    @app.route('/test', methods = ['POST', 'GET'])
    def test():
        if request.method == 'GET':
            return render_template('requester.html')
        elif request.method == 'POST':
            return request.remote_addr

    
    app.run(debug=True)
    
    import webbrowser
    webbrowser.open('http://127.0.0.1:5000/')
