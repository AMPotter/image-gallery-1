<template>
    <div>
        <h2>ABOUT PAGE</h2>
        <h3>Let's try out tabs.</h3>
        <Tabs>
            <Tab name="Tab 1">
                <h4>Tab 1 Header</h4>
                <p>Tab 1 content area.</p>
            </Tab>
            <Tab name="Tab 2">
                <h4>Tab 2 Header</h4>
                <p>Tab 2 content area.</p>
            </Tab>
            <Tab name="Tab 3">
                <h4>Tab 3 Header</h4>
                <p>Tab 3 content area.</p>
            </Tab>
        </Tabs>
    </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component';

export default {
  components: {
    Tabs,
    Tab
  }
};
</script>