from simple_node import SimpleNode


class AsyncNode(SimpleNode):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # implement

    def when_ready(self, callback):
        '''
        takes a callback to call when the resources of this node and its subtree all become ready, returns immediately

        Args:
            callback (function): will be called when all resources become ready
        '''
        # implement
        pass
