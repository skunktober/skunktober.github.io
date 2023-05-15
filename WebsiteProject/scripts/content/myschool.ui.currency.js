var PopulatecurrencyData = {

    WCFServiceUrl: "",

    Init: function () {

        var parentObject = this;

        // When the click has been done...
        $("#CurrencyButton").click(function () {
            if (($('#CurrencyValue').val().length == 0) || (!$.isNumeric($('#CurrencyValue').val()))) {
                $('#CurrencyValue').focus();
                if ($('#CurrencyValue').val().length == 0) {
                    $('#CurrencyValue').select();
                }
            }
            else {
                var value = $("#CurrencyValue").val();
                var from = $('#CurrencyFrom').find("option:selected").val();
                var to = $('#CurrencyTo').find("option:selected").val();

                parentObject.RetrieveCurrencyConversion(value, from, to);
            }

            // If the masonry plugin exists then reload it.
            if (jQuery().masonry) {
                if ($('#column1').length > 0) {
                    $('#column1').masonry('reload');
                }
            }
            return false;
        });

        // Only allow integer values.
        var allowedSpecialCharKeyCodes = [46, 8];
        var numberKeyCodes = [44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
        var decimalKeyCode = [190, 110];

        $("#CurrencyValue").keydown(function (event) {

            // Allow only backspace and delete
            if ((!event.shiftKey && !event.ctrlKey && !event.altKey) && (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0 || jQuery.inArray(event.keyCode, numberKeyCodes) >= 0 || jQuery.inArray(event.keyCode, decimalKeyCode) >= 0)) {
                // let it happen, don't do anything
            }
            else {
                // Ensure that it is a number and stop the keypress
                //if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
                //}
            }
        });

        // Build list items and default value.
        this.BuildSelectItems('CurrencyFrom', 'GBP');
        this.BuildSelectItems('CurrencyTo', 'EUR');

    },
    //End init
    BuildSelectItems: function (id, defaultVal) {
        var myOptions = {
            AFA: 'AFA-AfghanistanAfghani',
            ALL: 'ALL-AlbanianLek',
            DZD: 'DZD-AlgerianDinar',
            ARS: 'ARS-ArgentinePeso',
            AWG: 'AWG-ArubaFlorin',
            AUD: 'AUD-AustralianDollar',
            BSD: 'BSD-BahamianDollar',
            BHD: 'BHD-BahrainiDinar',
            BDT: 'BDT-BangladeshTaka',
            BBD: 'BBD-BarbadosDollar',
            BZD: 'BZD-BelizeDollar',
            BMD: 'BMD-BermudaDollar',
            BTN: 'BTN-BhutanNgultrum',
            BOB: 'BOB-BolivianBoliviano',
            BWP: 'BWP-BotswanaPula',
            BRL: 'BRL-BrazilianReal',
            GBP: 'GBP-BritishPound',
            BND: 'BND-BruneiDollar',
            BIF: 'BIF-BurundiFranc',
            XOF: 'XOF-CFAFranc(BCEAO)',
            XAF: 'XAF-CFAFranc(BEAC)',
            KHR: 'KHR-CambodiaRiel',
            CAD: 'CAD-CanadianDollar',
            CVE: 'CVE-CapeVerdeEscudo',
            KYD: 'KYD-CaymanIslandsDollar',
            CLP: 'CLP-ChileanPeso',
            CNY: 'CNY-ChineseYuan',
            COP: 'COP-ColombianPeso',
            KMF: 'KMF-ComorosFranc',
            CRC: 'CRC-CostaRicaColon',
            HRK: 'HRK-CroatianKuna',
            CUP: 'CUP-CubanPeso',
            CZK: 'CZK-CzechKoruna',
            DKK: 'DKK-DanishKrone',
            DJF: 'DJF-DijiboutiFranc',
            DOP: 'DOP-DominicanPeso',
            XCD: 'XCD-EastCaribbeanDollar',
            EGP: 'EGP-EgyptianPound',
            SVC: 'SVC-ElSalvadorColon',
            ETB: 'ETB-EthiopianBirr',
            EUR: 'EUR-Euro',
            FKP: 'FKP-FalklandIslandsPound',
            GMD: 'GMD-GambianDalasi',
            GIP: 'GIP-GibraltarPound',
            XAU: 'XAU-GoldOunces',
            GTQ: 'GTQ-GuatemalaQuetzal',
            GNF: 'GNF-GuineaFranc',
            GYD: 'GYD-GuyanaDollar',
            HTG: 'HTG-HaitiGourde',
            HNL: 'HNL-HondurasLempira',
            HKD: 'HKD-HongKongDollar',
            HUF: 'HUF-HungarianForint',
            ISK: 'ISK-IcelandKrona',
            INR: 'INR-IndianRupee',
            IDR: 'IDR-IndonesianRupiah',
            IQD: 'IQD-IraqiDinar',
            ILS: 'ILS-IsraeliShekel',
            JMD: 'JMD-JamaicanDollar',
            JPY: 'JPY-JapaneseYen',
            JOD: 'JOD-JordanianDinar',
            KZT: 'KZT-KazakhstanTenge',
            KES: 'KES-KenyanShilling',
            KRW: 'KRW-KoreanWon',
            KWD: 'KWD-KuwaitiDinar',
            LAK: 'LAK-LaoKip',
            LBP: 'LBP-LebanesePound',
            LSL: 'LSL-LesothoLoti',
            LRD: 'LRD-LiberianDollar',
            LYD: 'LYD-LibyanDinar',
            LTL: 'LTL-LithuanianLita',
            MOP: 'MOP-MacauPataca',
            MKD: 'MKD-MacedonianDenar',
            MWK: 'MWK-MalawiKwacha',
            MYR: 'MYR-MalaysianRinggit',
            MVR: 'MVR-MaldivesRufiyaa',
            MRO: 'MRO-MauritaniaOugulya',
            MUR: 'MUR-MauritiusRupee',
            MXN: 'MXN-MexicanPeso',
            MDL: 'MDL-MoldovanLeu',
            MNT: 'MNT-MongolianTugrik',
            MAD: 'MAD-MoroccanDirham',
            MMK: 'MMK-MyanmarKyat',
            NAD: 'NAD-NamibianDollar',
            NPR: 'NPR-NepaleseRupee',
            ANG: 'ANG-NethAntillesGuilder',
            NZD: 'NZD-NewZealandDollar',
            NIO: 'NIO-NicaraguaCordoba',
            NGN: 'NGN-NigerianNaira',
            KPW: 'KPW-NorthKoreanWon',
            NOK: 'NOK-NorwegianKrone',
            OMR: 'OMR-OmaniRial',
            XPF: 'XPF-PacificFranc',
            PKR: 'PKR-PakistaniRupee',
            XPD: 'XPD-PalladiumOunces',
            PAB: 'PAB-PanamaBalboa',
            PGK: 'PGK-PapuaNewGuineaKina',
            PYG: 'PYG-ParaguayanGuarani',
            PEN: 'PEN-PeruvianNuevoSol',
            PHP: 'PHP-PhilippinePeso',
            XPT: 'XPT-PlatinumOunces',
            PLN: 'PLN-PolishZloty',
            QAR: 'QAR-QatarRial',
            RUB: 'RUB-RussianRouble',
            WST: 'WST-SamoaTala',
            STD: 'STD-SaoTomeDobra',
            SAR: 'SAR-SaudiArabianRiyal',
            SCR: 'SCR-SeychellesRupee',
            SLL: 'SLL-SierraLeoneLeone',
            XAG: 'XAG-SilverOunces',
            SGD: 'SGD-SingaporeDollar',
            SBD: 'SBD-SolomonIslandsDollar',
            SOS: 'SOS-SomaliShilling',
            ZAR: 'ZAR-SouthAfricanRand',
            LKR: 'LKR-SriLankaRupee',
            SHP: 'SHP-StHelenaPound',
            SZL: 'SZL-SwazilandLilageni',
            SEK: 'SEK-SwedishKrona',
            TRY: 'TRY-TurkeyLira',
            CHF: 'CHF-SwissFranc',
            SYP: 'SYP-SyrianPound',
            TWD: 'TWD-TaiwanDollar',
            TZS: 'TZS-TanzanianShilling',
            THB: 'THB-ThaiBaht',
            TOP: 'TOP-TongaPa\'anga',
            TTD: 'TTD-Trinidad&amp;TobagoDollar',
            TND: 'TND-TunisianDinar',
            USD: 'USD-U.S.Dollar',
            AED: 'AED-UAEDirham',
            UGX: 'UGX-UgandanShilling',
            UAH: 'UAH-UkraineHryvnia',
            UYU: 'UYU-UruguayanNewPeso',
            VUV: 'VUV-VanuatuVatu',
            VND: 'VND-VietnamDong',
            YER: 'YER-YemenRiyal',
            YUM: 'YUM-YugoslavDinar',
            ZWD: 'ZWD-ZimbabweDollar'
        };

        var mySelect = $('#' + id);

        $.each(myOptions, function (val, text) {
            mySelect.append($('<option>').val(val).html(text));
        });

        mySelect.val(defaultVal);
    },

    //End FancyAlert
    CheckServiceUrlSet: function () {
        return ValidateUrl(this.WCFServiceUrl);
    },
    //End checkServiceUrlSet

    RetrieveCurrencyConversion: function (value, from, to) {

        // If the wcf service url is not set then show error and dont carry out data call.
        if (!this.CheckServiceUrlSet()) {
            FancyAlert("Cannot connect to service");
            return false;
        }

        if ((from == to) || (parseInt(value) == 0)) {
            // Same units so dont even need to convert
            var html = $("#CurrencyValue").val() + " " + from + " = " + value + " " + to;
            $("#result").html(html);
            return false;
        }

        var success = false;
        var parent = this;

        // Data call.
        $.ajax({
            async: false,
            type: "POST",
            url: parent.WCFServiceUrl + 'Client/User/Widget/ContentClient.svc/ConvertCurrency',
            contentType: "application/json; charset=utf-8",
            data: '{ "value":"' + value + '", "currencyTypeFrom":"' + from + '", "currencyTypeTo":"' + to + '" }',
            failure: function () {
                FancyFailedMessage();
            },
            success: function (data) {
                if (data.d.ClientOutcome =="Success") {
                    var html = $("#CurrencyValue").val() + " " + from + " = " + data.d.Data.Value.toString() + " " + to;

                    if ((value != '0') && (data.d.Data.toString() == '0')) {
                        html = 'Could not carry out conversion';
                    }
                    else {
                        $("#CurrencyValue").val('');
                    }
                    $("#result").html(html);
                    success = true;
                } else {
                    $("#CurrencyValue").val('');
                    FancyFailedMessage();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
            }
        });

        return success;
    }
};