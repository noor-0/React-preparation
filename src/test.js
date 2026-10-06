/**
 * @param {(Node | null)[]} lists
 * @returns Node | null
 */
export default function linkedListCombineKSorted(lists) {
    let i = 0, n = lists.length, head = null;
    while (i < n) {
        if (lists[i] != null) {
            head = lists[i];
            i++;
            break;
        }
        i++;
    }
    if (i == n) return head;
    while (i < n) {
        let temp = lists[i];
        while (temp != null) {
            let cur = temp.next;
            head = insert(head, temp);
            temp = cur;
        }
        i++;
    }
    return head;

    function insert(head, node) {
        if (node == null) return head;
        if (node.val <= head.val) {
            node.next = head;
            return node;
        }
        let prev = null, cur = head;
        while (cur != null) {
            if (cur.val >= node.val) {
                break;
            }
            prev = cur;
            cur = cur.next;
        }
        prev.next = node;
        node.next = cur;
        return head;
    }
}