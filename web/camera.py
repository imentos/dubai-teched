import sys
from pubnub import Pubnub

## -----------------------------------------------------------------------
## Initiate Pubnub State
## -----------------------------------------------------------------------
pubnub = Pubnub(publish_key='pub-c-c9bc3d23-4bc7-44a7-a1dc-c2d1f9445a25', subscribe_key='sub-c-22a3eac0-0971-11e5-bf9c-0619f8945a4f',
                secret_key='sec-c-NGQ0MzU5NTUtMWYxZi00YTBiLWIzNGEtZDBhNmFlY2JkZTFi', cipher_key=cipher_key, ssl_on=ssl_on, pooling=False)
channel = 'test'
message = 'file name'


# Synchronous usage
print pubnub.publish(channel, message)

# Asynchronous usage
def callback(message):
    print(message)

pubnub.publish(channel, message, callback=callback, error=callback)