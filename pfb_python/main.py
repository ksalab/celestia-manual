import asyncio

from json import loads, dumps

import subprocess
import sys

from websockets.server import serve


async def echo(websocket):
    async for message in websocket:
        data = loads(message)

        namespace_id = data["id"]
        namespace_data = data["data"]

        data_out = str(
            subprocess.run(
                "$(pwd)/request.sh \"{}\" \"{}\"".format(namespace_id, namespace_data),
                capture_output=True,
                shell=True
            ).stdout
        )[1::]

        await websocket.send(data_out)


async def main(port):
    async with serve(echo, "0.0.0.0", port):
        await asyncio.Future()


if __name__ == "__main__":
    if not (len(sys.argv) == 2):
        print("Cannot start WebSocket server: port not defined")
        exit(-1)

    print("Starting WebSocket on 0.0.0.0:{}...".format(sys.argv[1]))
    asyncio.run(main(sys.argv[1]))
