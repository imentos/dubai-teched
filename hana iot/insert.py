import urllib3
import certifi
from time import sleep
import serial
import pdb
ser = serial.Serial('/dev/cu.usbmodem1411', 9600) # Establish the connection on a specific port

# It is absolutely CRITICAL that you use certificate validation to ensure and guarantee that
# 1. you are indeed sending the message to *.hanatrial.ondemand.com and
# 2. that you avoid the possibility of TLS/SSL MITM attacks which would allow a malicious person to capture the OAuth token
# URLLIB3 DOES NOT VERIFY CERTIFICATES BY DEFAULT
# Therefore, install urllib3 and certifi and specify the PoolManager as below to enforce certificate check
# See https://urllib3.readthedocs.org/en/latest/security.html for more details

# use with or without proxy
http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED', ca_certs=certifi.where())  # Path to the Certifi bundle.

# http = urllib3.proxy_from_url('http://proxy_host:proxy_port')

# interaction for a specific Device instance - replace 1 with your specific Device ID
url = 'https://iotmmsi818292trial.hanatrial.ondemand.com/com.sap.iotservices.mms/v1/api/http/data/492b19c8-933d-4e9d-9992-87be148ebd3a'

headers = urllib3.util.make_headers()

# use with authentication
# please insert correct OAuth token
headers['Authorization'] = 'Bearer ' + '498e4e3d4628342659ffc8c48172e8a9'
headers['Content-Type'] = 'application/json;charset=utf-8'

# send message of Message Type 1 and the corresponding payload layout that you defined in the IoT Services Cockpit
body='{"mode":"async", "messageType":"b85d7216d50e3c2ec882", "messages":[{status:true}]}'



counter = 32 # Below 32 everything in ASCII is gibberish

while True:
    counter +=1
    ser.write(str(chr(counter))) # Convert the decimal number to ASCII then send it to the Arduino
    print ser.readline() # Read the newest output from the Arduino
    # pdb.set_trace()
    
    if ser.readline() == '0':
        body='{"mode":"async", "messageType":"b85d7216d50e3c2ec882", "messages":[{status:false}]}'
    else:
        body='{"mode":"async", "messageType":"b85d7216d50e3c2ec882", "messages":[{status:true}]}'

    try:
        r = http.urlopen('POST', url, body=body, headers=headers)
        print(r.status)
        print(r.data)
    except urllib3.exceptions.SSLError as e:
        print e


# sleep(.1) # Delay for one tenth of a second
#    if counter == 255:
#     counter = 32