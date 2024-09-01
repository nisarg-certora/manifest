(function() {var type_impls = {
"manifest":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-RedBlackTree%3C'a,+V%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hypertree/red_black_tree.rs.html#471\">source</a><a href=\"#impl-RedBlackTree%3C'a,+V%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'a, V&gt; <a class=\"struct\" href=\"hypertree/red_black_tree/struct.RedBlackTree.html\" title=\"struct hypertree::red_black_tree::RedBlackTree\">RedBlackTree</a>&lt;'a, V&gt;<div class=\"where\">where\n    V: <a class=\"trait\" href=\"hypertree/tree/trait.TreeValue.html\" title=\"trait hypertree::tree::TreeValue\">TreeValue</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/hypertree/red_black_tree.rs.html#474\">source</a><h4 class=\"code-header\">pub fn <a href=\"hypertree/red_black_tree/struct.RedBlackTree.html#tymethod.new\" class=\"fn\">new</a>(\n    data: &amp;'a mut [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.78.0/std/primitive.u8.html\">u8</a>],\n    root_index: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.78.0/std/primitive.u32.html\">u32</a>,\n    max_index: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.78.0/std/primitive.u32.html\">u32</a>\n) -&gt; <a class=\"struct\" href=\"hypertree/red_black_tree/struct.RedBlackTree.html\" title=\"struct hypertree::red_black_tree::RedBlackTree\">RedBlackTree</a>&lt;'a, V&gt;</h4></section></summary><div class=\"docblock\"><p>Creates a new RedBlackTree. Does not mutate data yet. Assumes the actual\ndata in data is already well formed as a red black tree.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.iter\" class=\"method\"><a class=\"src rightside\" href=\"src/hypertree/red_black_tree.rs.html#1060\">source</a><h4 class=\"code-header\">pub fn <a href=\"hypertree/red_black_tree/struct.RedBlackTree.html#tymethod.iter\" class=\"fn\">iter</a>(&amp;self) -&gt; <a class=\"struct\" href=\"hypertree/red_black_tree/struct.RedBlackTreeReadOnlyIterator.html\" title=\"struct hypertree::red_black_tree::RedBlackTreeReadOnlyIterator\">RedBlackTreeReadOnlyIterator</a>&lt;'_, <a class=\"struct\" href=\"hypertree/red_black_tree/struct.RedBlackTree.html\" title=\"struct hypertree::red_black_tree::RedBlackTree\">RedBlackTree</a>&lt;'_, V&gt;, V&gt;</h4></section></summary><div class=\"docblock\"><p>Sorted iterator starting from the min.</p>\n</div></details></div></details>",0,"manifest::state::global::GlobalTraderTree","manifest::state::market::ClaimedSeatTree","manifest::state::market::Bookside"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-TreeWriteOperations%3C'a,+V%3E-for-RedBlackTree%3C'a,+V%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hypertree/red_black_tree.rs.html#372\">source</a><a href=\"#impl-TreeWriteOperations%3C'a,+V%3E-for-RedBlackTree%3C'a,+V%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'a, V&gt; <a class=\"trait\" href=\"hypertree/tree/trait.TreeWriteOperations.html\" title=\"trait hypertree::tree::TreeWriteOperations\">TreeWriteOperations</a>&lt;'a, V&gt; for <a class=\"struct\" href=\"hypertree/red_black_tree/struct.RedBlackTree.html\" title=\"struct hypertree::red_black_tree::RedBlackTree\">RedBlackTree</a>&lt;'a, V&gt;<div class=\"where\">where\n    V: <a class=\"trait\" href=\"hypertree/tree/trait.TreeValue.html\" title=\"trait hypertree::tree::TreeValue\">TreeValue</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.insert\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hypertree/red_black_tree.rs.html#374\">source</a><a href=\"#method.insert\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"hypertree/tree/trait.TreeWriteOperations.html#tymethod.insert\" class=\"fn\">insert</a>(&amp;mut self, index: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.78.0/std/primitive.u32.html\">u32</a>, value: V)</h4></section></summary><div class=\"docblock\"><p>Insert and rebalance. The data at index should be already zeroed.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.remove_by_index\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hypertree/red_black_tree.rs.html#417\">source</a><a href=\"#method.remove_by_index\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"hypertree/tree/trait.TreeWriteOperations.html#tymethod.remove_by_index\" class=\"fn\">remove_by_index</a>(&amp;mut self, index: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.78.0/std/primitive.u32.html\">u32</a>)</h4></section></summary><div class=\"docblock\"><p>Remove a node by index and rebalance.</p>\n</div></details></div></details>","TreeWriteOperations<'a, V>","manifest::state::global::GlobalTraderTree","manifest::state::market::ClaimedSeatTree","manifest::state::market::Bookside"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()