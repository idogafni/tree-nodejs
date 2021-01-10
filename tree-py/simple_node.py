from resource import Resource


class SimpleNode:
    def __init__(self):
        self.res = Resource(self.on_resource_ready)

        # implement

    def on_resource_ready(self, value):
        '''
        an event handler called when the resource becomes ready, should not be called directly

        Args:
            value (str): the resource payload (can be left unused for the scope of the assignment)
        '''
        # implement
        pass

    def add_child(self, child):
        '''
        adds child node as a child of this node

        Args:
            child (SimpleNode): the child to add
        '''
        # implement
        pass

    def remove_child(self, child):
        '''
        removes an existing child from this node

        Args:
            child (SimpleNode): the child to add
        '''
        # implement
        pass

    def is_ready(self):
        '''
        checks whether the resources of this node and its subtree are all ready

        Returns:
            bool: are all resources ready
        '''
        # implement
        pass
