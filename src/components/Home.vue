<template>
    <div>
        <Server v-for="server in Servers" :server="server" :key="server" />
    </div>
</template>

<script>
import Server from './Server';
import Servers from '@/assets/data/Servers.json';

export default {
    name: 'Home',
    data() {
        return {
            Servers,
        }
    },
    components: {
        Server,
    },
}
</script>


