<script>
    import {onMount} from 'svelte';
    import {createEventDispatcher} from 'svelte';

    let fromCurrency = 'USD';
    let toCurrency = 'EUR';
    let amount = 1;
    let exchangeRate = null;

    const API_KEY = '7b26d09442f468cbe9445994';
    const dispatch = createEventDispatcher();

    async function fetchExchangeRate() {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
        const data = await response.json();
        exchangeRate = data.conversion_rates[toCurrency];
        convertedAmount = convertCurrency();
    }

    function convertCurrency() {
        return (amount * exchangeRate).toFixed(2);
    }

    function handleAmountInput(event) {
        amount = parseFloat(event.target.value) || 0;
        convertedAmount = convertCurrency();
    }

    onMount(fetchExchangeRate);

    $: convertedAmount = convertCurrency();


    function handleCurrencyChange() {
        fetchExchangeRate();
        convertedAmount = convertCurrency();
        dispatch('update');
    }
</script>

<div>
    <label>
        From:
        <input type="text" bind:value={amount} on:input={handleAmountInput}/>
        <select bind:value={fromCurrency} on:change={handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="RUB">RUB</option>
        </select>
    </label>
</div>

<div>
    <label>
        To:
        <input type="text" value={convertedAmount} readonly/>
        <select bind:value={toCurrency} on:change={handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="RUB">RUB</option>
        </select>
    </label>
</div>